const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { getConnection, sql } = require('../Config/conexion');
const { verifyAdmin } = require('./authMiddleware');
const config = require('../Config/config');

const JWT_SECRET = config.jwtSecret;

// Helper para hashear contraseñas usando SHA-256 nativo
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// 1. REGISTRO DE USUARIO (HUÉSPED) - Público
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Completa todos los campos requeridos.' });
  }

  try {
    const pool = await getConnection();
    
    // Verificar si el correo o el usuario ya existen
    const checkUser = await pool.request()
      .input('usuario', sql.NVarChar, nombre)
      .input('correo', sql.NVarChar, email)
      .query('SELECT usuario, correo FROM usuarios WHERE usuario = @usuario OR correo = @correo');

    if (checkUser.recordset.length > 0) {
      const match = checkUser.recordset[0];
      if (match.correo.toLowerCase() === email.toLowerCase()) {
        return res.status(400).json({ error: 'Este correo ya está registrado.' });
      }
      return res.status(400).json({ error: 'Este nombre de usuario ya existe. Elige otro.' });
    }

    // Hashear contraseña
    const hashedPassword = hashPassword(password);

    // Insertar nuevo usuario (con prefijo N para acentos y tildes si los hay)
    await pool.request()
      .input('usuario', sql.NVarChar, nombre)
      .input('correo', sql.NVarChar, email)
      .input('contrasena', sql.NVarChar, hashedPassword)
      .query('INSERT INTO usuarios (usuario, correo, contrasena) VALUES (@usuario, @correo, @contrasena)');

    res.status(201).json({ message: '¡Cuenta creada exitosamente! Ya puedes iniciar sesión.' });
  } catch (err) {
    console.error('Error al registrar usuario:', err.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 2. INICIO DE SESIÓN (LOGIN) - Público
router.post('/login', async (req, res) => {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res.status(400).json({ error: 'Completa todos los campos.' });
  }

  // Administrador por código (HCS-ADMINISTRADOR / 2026HOTELCOSTASUR)
  const ADMIN_USER = 'HCS-ADMINISTRADOR';
  const ADMIN_PASS = '2026HOTELCOSTASUR';

  if (nombre.trim().toUpperCase() === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign(
      { id: 0, nombre: ADMIN_USER, rol: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.json({
      token,
      user: { id: 0, nombre: ADMIN_USER, rol: 'admin' }
    });
  }

  try {
    const pool = await getConnection();
    
    // Buscar usuario en base de datos
    const result = await pool.request()
      .input('usuario', sql.NVarChar, nombre)
      .query('SELECT id_usuario, usuario, correo, contrasena, rol FROM usuarios WHERE usuario = @usuario');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    const dbUser = result.recordset[0];
    const hashedPassword = hashPassword(password);

    if (dbUser.contrasena !== hashedPassword) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: dbUser.id_usuario, nombre: dbUser.usuario, rol: dbUser.rol },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: dbUser.id_usuario,
        nombre: dbUser.usuario,
        email: dbUser.correo,
        rol: dbUser.rol
      }
    });
  } catch (err) {
    console.error('Error al iniciar sesión:', err.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 3. CONSULTAR USUARIOS (ADMIN)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query("SELECT id_usuario AS id, usuario AS nombre, correo AS email, fecha_registro AS fechaRegistro FROM usuarios WHERE rol != 'admin' ORDER BY fecha_registro DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener usuarios:', err.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 4. CREAR USUARIO (ADMIN)
router.post('/', verifyAdmin, async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Completa todos los campos.' });
  }

  try {
    const pool = await getConnection();
    
    // Validar duplicados
    const check = await pool.request()
      .input('usuario', sql.NVarChar, nombre)
      .input('correo', sql.NVarChar, email)
      .query('SELECT usuario FROM usuarios WHERE usuario = @usuario OR correo = @correo');

    if (check.recordset.length > 0) {
      return res.status(400).json({ error: 'El usuario o correo ya está registrado.' });
    }

    const hashedPassword = hashPassword(password);
    await pool.request()
      .input('usuario', sql.NVarChar, nombre)
      .input('correo', sql.NVarChar, email)
      .input('contrasena', sql.NVarChar, hashedPassword)
      .query('INSERT INTO usuarios (usuario, correo, contrasena) VALUES (@usuario, @correo, @contrasena)');

    res.status(201).json({ message: `Usuario "${nombre}" creado exitosamente.` });
  } catch (err) {
    console.error('Error al crear usuario por admin:', err.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 5. EDITAR USUARIO (ADMIN)
router.put('/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son obligatorios.' });
  }

  try {
    const pool = await getConnection();
    
    // Actualizar datos
    if (password) {
      const hashedPassword = hashPassword(password);
      await pool.request()
        .input('id', sql.Int, id)
        .input('usuario', sql.NVarChar, nombre)
        .input('correo', sql.NVarChar, email)
        .input('contrasena', sql.NVarChar, hashedPassword)
        .query('UPDATE usuarios SET usuario = @usuario, correo = @correo, contrasena = @contrasena WHERE id_usuario = @id');
    } else {
      await pool.request()
        .input('id', sql.Int, id)
        .input('usuario', sql.NVarChar, nombre)
        .input('correo', sql.NVarChar, email)
        .query('UPDATE usuarios SET usuario = @usuario, correo = @correo WHERE id_usuario = @id');
    }

    res.json({ message: `Usuario "${nombre}" actualizado.` });
  } catch (err) {
    console.error('Error al actualizar usuario:', err.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 6. ELIMINAR USUARIO (ADMIN)
router.delete('/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();
    
    // Primero, eliminar las reservas asociadas a este usuario
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM reservas WHERE id_usuario = @id');

    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM usuarios WHERE id_usuario = @id');

    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (err) {
    console.error('Error al eliminar usuario:', err.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;
