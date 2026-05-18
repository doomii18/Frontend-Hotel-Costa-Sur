const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../Config/conexion');

// 1. Obtener todas las habitaciones
router.get('/', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.query('SELECT id_habitacion AS id, nombre, tipo, categoria, precio, caracteristicas, disponible, televisor, aire FROM habitaciones ORDER BY id_habitacion');
    
    // Convertir la columna caracteristicas (JSON string) en un array real de Javascript
    const rooms = result.recordset.map(room => {
      try {
        return {
          ...room,
          precio: Number(room.precio),
          caracteristicas: JSON.parse(room.caracteristicas)
        };
      } catch (e) {
        return {
          ...room,
          precio: Number(room.precio),
          caracteristicas: room.caracteristicas ? room.caracteristicas.split(',') : []
        };
      }
    });

    res.json(rooms);
  } catch (err) {
    console.error('Error al obtener habitaciones de la BD:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// 2. Obtener una habitación por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT id_habitacion AS id, nombre, tipo, categoria, precio, caracteristicas, disponible, televisor, aire FROM habitaciones WHERE id_habitacion = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Habitación no encontrada.' });
    }

    const room = result.recordset[0];
    try {
      room.caracteristicas = JSON.parse(room.caracteristicas);
    } catch (e) {
      room.caracteristicas = room.caracteristicas ? room.caracteristicas.split(',') : [];
    }
    room.precio = Number(room.precio);

    res.json(room);
  } catch (err) {
    console.error(`Error al obtener la habitación ${id}:`, err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;
