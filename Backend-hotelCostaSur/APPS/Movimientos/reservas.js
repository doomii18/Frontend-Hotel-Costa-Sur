const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../Config/conexion');
const { verifyToken, verifyAdmin } = require('../../Seguridad/authMiddleware');

// 1. Crear una Reserva (Requiere autenticación de usuario) - Público/Huésped
router.post('/', verifyToken, async (req, res) => {
  const {
    habitacionId,
    tipoDocumento,
    cedula,
    paisPasaporte,
    pasaporte,
    nombres,
    apellidos,
    sexo,
    fechaNacimiento,
    nacionalidad,
    procedencia,
    fechaIngreso,
    fechaSalida,
    dias,
    huespedes,
    metodoPago,
    total
  } = req.body;

  if (!habitacionId || !fechaIngreso || !fechaSalida || !nombres || !apellidos) {
    return res.status(400).json({ error: 'Completa todos los campos requeridos.' });
  }

  // El id del usuario proviene del token autenticado (req.user.id)
  let usuarioId = req.user.id;
  
  // Si el admin está registrando la reserva, puede asociarla a otro usuario
  if (req.user.rol === 'admin' && req.body.usuarioId) {
    usuarioId = req.body.usuarioId;
  } else if (req.user.rol === 'admin' && (usuarioId === 0 || usuarioId === 'admin-hcs')) {
    // ID 1 es el huésped genérico registrado por defecto en inserts.sql
    usuarioId = 1; 
  }

  let transaction;
  try {
    const pool = await getConnection();
    
    // Iniciar transacción SQL para asegurar consistencia
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // 1. Verificar disponibilidad de la habitación
    const checkRoom = await transaction.request()
      .input('habId', sql.Int, habitacionId)
      .query('SELECT disponible FROM habitaciones WHERE id_habitacion = @habId');

    if (checkRoom.recordset.length === 0) {
      await transaction.rollback();
      return res.status(404).json({ error: 'La habitación seleccionada no existe.' });
    }

    if (!checkRoom.recordset[0].disponible) {
      await transaction.rollback();
      return res.status(400).json({ error: 'La habitación ya se encuentra reservada.' });
    }

    // 2. Insertar reserva en la BD (con prefijo N para caracteres especiales)
    const insertReservaQuery = `
      INSERT INTO reservas (
        id_usuario, id_habitacion, estado, fecha_ingreso, fecha_salida, dias, total,
        nombres, apellidos, tipo_documento, cedula, pasaporte, pais_pasaporte,
        sexo, fecha_nacimiento, nacionalidad, procedencia, num_huespedes, metodo_pago, fecha_reserva
      ) VALUES (
        @usuarioId, @habitacionId, 'pendiente', @fechaIngreso, @fechaSalida, @dias, @total,
        @nombres, @apellidos, @tipoDocumento, @cedula, @pasaporte, @paisPasaporte,
        @sexo, @fechaNacimiento, @nacionalidad, @procedencia, @huespedes, @metodoPago, GETDATE()
      );
      SELECT SCOPE_IDENTITY() AS insertId;
    `;

    const insertResult = await transaction.request()
      .input('usuarioId', sql.Int, usuarioId)
      .input('habitacionId', sql.Int, habitacionId)
      .input('fechaIngreso', sql.Date, fechaIngreso)
      .input('fechaSalida', sql.Date, fechaSalida)
      .input('dias', sql.Int, dias)
      .input('total', sql.Decimal(10, 2), total)
      .input('nombres', sql.NVarChar, nombres)
      .input('apellidos', sql.NVarChar, apellidos)
      .input('tipoDocumento', sql.NVarChar, tipoDocumento)
      .input('cedula', sql.NVarChar, cedula || null)
      .input('pasaporte', sql.NVarChar, pasaporte || null)
      .input('paisPasaporte', sql.NVarChar, paisPasaporte || null)
      .input('sexo', sql.NVarChar, sexo)
      .input('fechaNacimiento', sql.Date, fechaNacimiento)
      .input('nacionalidad', sql.NVarChar, nacionalidad)
      .input('procedencia', sql.NVarChar, procedencia)
      .input('huespedes', sql.Int, huespedes)
      .input('metodoPago', sql.NVarChar, metodoPago)
      .query(insertReservaQuery);

    const newReservaId = insertResult.recordset[0].insertId;

    // 3. Marcar la habitación como no disponible
    await transaction.request()
      .input('habId', sql.Int, habitacionId)
      .query('UPDATE habitaciones SET disponible = 0 WHERE id_habitacion = @habId');

    // Confirmar la transacción
    await transaction.commit();
    
    res.status(201).json({ 
      message: '¡Reserva creada exitosamente!', 
      id: newReservaId,
      estado: 'pendiente'
    });
  } catch (err) {
    console.error('Error al crear reserva:', err);
    if (transaction) {
      try { await transaction.rollback(); } catch (ex) { console.error('Error en rollback:', ex); }
    }
    res.status(500).json({ error: 'Error al procesar la reserva en la BD.' });
  }
});

// 2. Obtener mis reservas (Huésped autenticado)
router.get('/mis-reservas', verifyToken, async (req, res) => {
  const usuarioId = req.user.id;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('usuarioId', sql.Int, usuarioId)
      .query(`
        SELECT 
          r.id_reserva AS id,
          r.id_usuario AS usuarioId,
          u.usuario AS usuarioNombre,
          r.id_habitacion AS habitacionId,
          h.nombre AS habitacionNombre,
          r.estado,
          CONVERT(VARCHAR(10), r.fecha_ingreso, 120) AS fechaIngreso,
          CONVERT(VARCHAR(10), r.fecha_salida, 120) AS fechaSalida,
          r.dias,
          r.total,
          r.nombres,
          r.apellidos,
          r.tipo_documento AS tipoDocumento,
          r.cedula,
          r.pasaporte,
          r.pais_pasaporte AS paisPasaporte,
          r.sexo,
          CONVERT(VARCHAR(10), r.fecha_nacimiento, 120) AS fechaNacimiento,
          r.nacionalidad,
          r.procedencia,
          r.num_huespedes AS huespedes,
          r.metodo_pago AS metodoPago,
          r.fecha_reserva AS fechaReserva
        FROM reservas r
        JOIN usuarios u ON r.id_usuario = u.id_usuario
        JOIN habitaciones h ON r.id_habitacion = h.id_habitacion
        WHERE r.id_usuario = @usuarioId
        ORDER BY r.fecha_reserva DESC
      `);

    const mapped = result.recordset.map(r => ({ ...r, total: Number(r.total) }));
    res.json(mapped);
  } catch (err) {
    console.error('Error al obtener mis reservas:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 3. Obtener todas las reservas (Solo Admin)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.query(`
      SELECT 
        r.id_reserva AS id,
        r.id_usuario AS usuarioId,
        u.usuario AS usuarioNombre,
        r.id_habitacion AS habitacionId,
        h.nombre AS habitacionNombre,
        r.estado,
        CONVERT(VARCHAR(10), r.fecha_ingreso, 120) AS fechaIngreso,
        CONVERT(VARCHAR(10), r.fecha_salida, 120) AS fechaSalida,
        r.dias,
        r.total,
        r.nombres,
        r.apellidos,
        r.tipo_documento AS tipoDocumento,
        r.cedula,
        r.pasaporte,
        r.pais_pasaporte AS paisPasaporte,
        r.sexo,
        CONVERT(VARCHAR(10), r.fecha_nacimiento, 120) AS fechaNacimiento,
        r.nacionalidad,
        r.procedencia,
        r.num_huespedes AS huespedes,
        r.metodo_pago AS metodoPago,
        r.fecha_reserva AS fechaReserva
      FROM reservas r
      LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN habitaciones h ON r.id_habitacion = h.id_habitacion
      ORDER BY r.fecha_reserva DESC
    `);

    const mapped = result.recordset.map(r => ({ 
      ...r, 
      total: Number(r.total),
      usuarioNombre: r.usuarioNombre || 'Huésped Externo/Admin' 
    }));
    res.json(mapped);
  } catch (err) {
    console.error('Error al listar todas las reservas:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 4. Cancelar / Eliminar una Reserva (Usuario para la suya, o Admin para cualquiera)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  let transaction;
  try {
    const pool = await getConnection();
    
    // Obtener los detalles de la reserva para verificar pertenencia
    const checkReserva = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT id_usuario, id_habitacion, estado FROM reservas WHERE id_reserva = @id');

    if (checkReserva.recordset.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    const reserva = checkReserva.recordset[0];

    // Si no es admin y tampoco es el dueño de la reserva
    if (user.rol !== 'admin' && String(reserva.id_usuario) !== String(user.id)) {
      return res.status(403).json({ error: 'Acceso denegado. No puedes cancelar reservas ajenas.' });
    }

    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // 1. Eliminar la reserva
    await transaction.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM reservas WHERE id_reserva = @id');

    // 2. Si la reserva estaba pendiente o activa, liberar la habitación
    if (reserva.estado !== 'completado') {
      await transaction.request()
        .input('habId', sql.Int, reserva.id_habitacion)
        .query('UPDATE habitaciones SET disponible = 1 WHERE id_habitacion = @habId');
    }

    await transaction.commit();
    res.json({ message: 'Reserva eliminada con éxito y habitación liberada.' });
  } catch (err) {
    console.error('Error al eliminar reserva:', err);
    if (transaction) {
      try { await transaction.rollback(); } catch (ex) { console.error(ex); }
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 5. Confirmar Check-In (Solo Admin)
router.put('/checkin/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query("UPDATE reservas SET estado = 'activo' WHERE id_reserva = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    res.json({ message: 'Check-In confirmado correctamente.' });
  } catch (err) {
    console.error('Error al realizar check-in:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 6. Confirmar Check-Out y Liberar Habitación (Solo Admin)
router.put('/checkout/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  let transaction;

  try {
    const pool = await getConnection();

    const checkRes = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT id_habitacion FROM reservas WHERE id_reserva = @id');

    if (checkRes.recordset.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    const habId = checkRes.recordset[0].id_habitacion;

    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // 1. Actualizar estado de la reserva a completado
    await transaction.request()
      .input('id', sql.Int, id)
      .query("UPDATE reservas SET estado = 'completado' WHERE id_reserva = @id");

    // 2. Liberar la habitación
    await transaction.request()
      .input('habId', sql.Int, habId)
      .query('UPDATE habitaciones SET disponible = 1 WHERE id_habitacion = @habId');

    await transaction.commit();
    res.json({ message: 'Check-Out realizado con éxito y habitación liberada.' });
  } catch (err) {
    console.error('Error al realizar check-out:', err);
    if (transaction) {
      try { await transaction.rollback(); } catch (ex) { console.error(ex); }
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;
