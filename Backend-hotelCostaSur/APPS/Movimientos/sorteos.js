const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../Config/conexion');
const { verifyAdmin } = require('../../Seguridad/authMiddleware');

// 1. Registrar un participante en el sorteo (Público)
router.post('/', async (req, res) => {
  const {
    nombres,
    apellidos,
    email,
    telefono,
    departamento,
    sexo,
    edad,
    ocupacion
  } = req.body;

  if (!nombres || !apellidos || !email || !telefono || !departamento) {
    return res.status(400).json({ error: 'Completa todos los campos requeridos.' });
  }

  try {
    const pool = await getConnection();
    await pool.request()
      .input('nombres', sql.NVarChar, nombres)
      .input('apellidos', sql.NVarChar, apellidos)
      .input('correo', sql.NVarChar, email)
      .input('telefono', sql.NVarChar, telefono)
      .input('departamento', sql.NVarChar, departamento)
      .input('sexo', sql.NVarChar, sexo)
      .input('edad', sql.Int, parseInt(edad) || 0)
      .input('ocupacion', sql.NVarChar, ocupacion || '')
      .query(`
        INSERT INTO participantes_sorteo (
          nombres, apellidos, correo, telefono, departamento, sexo, edad, ocupacion, fecha_registro
        ) VALUES (
          @nombres, @apellidos, @correo, @telefono, @departamento, @sexo, @edad, @ocupacion, GETDATE()
        )
      `);

    res.status(201).json({ message: '¡Gracias por participar! Te contactaremos si ganas.' });
  } catch (err) {
    console.error('Error al registrar participante en sorteo:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 2. Obtener la lista de participantes en el sorteo (Solo Admin)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.query('SELECT id_participante AS id, nombres, apellidos, correo AS email, telefono, departamento, sexo, edad, ocupacion, fecha_registro AS fecha FROM participantes_sorteo ORDER BY fecha_registro DESC');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al listar participantes del sorteo:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;
