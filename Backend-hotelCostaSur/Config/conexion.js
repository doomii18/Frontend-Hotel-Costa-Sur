const sql = require('mssql');
const config = require('./config');

const poolPromise = new sql.ConnectionPool(config.db)
  .connect()
  .then(pool => {
    console.log('🔌 Conexión exitosa a la base de datos SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('💥 Error de conexión a la base de datos SQL Server:', err.message);
    throw err;
  });

async function getConnection() {
  return poolPromise;
}

module.exports = { getConnection, sql };
