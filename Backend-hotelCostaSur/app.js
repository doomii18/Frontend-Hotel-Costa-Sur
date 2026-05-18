const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./Config/config');

// Routers
const usuariosRouter = require('./Seguridad/usuarios');
const habitacionesRouter = require('./APPS/Catalogos/habitaciones');
const reservasRouter = require('./APPS/Movimientos/reservas');
const sorteosRouter = require('./APPS/Movimientos/sorteos');

const app = express();
const PORT = config.port;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Cargar las rutas principales mapeadas a la estructura de Django
app.use('/api/usuarios', usuariosRouter);
app.use('/api/habitaciones', habitacionesRouter);
app.use('/api/reservas', reservasRouter);
app.use('/api/sorteos', sorteosRouter);

// Ruta Raíz Informativa
app.get('/', (req, res) => {
  res.json({
    message: '🏨 API Monolítica Oficial del Hotel Costa Sur',
    version: '2.5.0',
    estructura: 'Estilo Django (Config, Seguridad, APPS/Catalogos, APPS/Movimientos)'
  });
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`=============================================================`);
  console.log(`🚀 SERVIDOR UNIFICADO CORRIENDO EN EL PUERTO: ${PORT}`);
  console.log(`📡 URL base del API: http://localhost:${PORT}/api`);
  console.log(`📂 Estructura unificada en: APPS/, Seguridad/, Config/`);
  console.log(`=============================================================`);
});
