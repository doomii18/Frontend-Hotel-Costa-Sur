require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'HotelCostaSur2026_SecretKey',
  db: {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'admin123',
    server: process.env.DB_SERVER || 'DESKTOP-KV0J6M3',
    database: process.env.DB_DATABASE || 'HotelCostaSur',
    options: {
      encrypt: true,
      trustServerCertificate: true // Crucial para entornos locales de desarrollo
    }
  }
};
