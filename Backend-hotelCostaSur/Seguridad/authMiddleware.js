const jwt = require('jsonwebtoken');
const config = require('../Config/config');

const JWT_SECRET = config.jwtSecret;

// Middleware para verificar el Token JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado. Token no provisto.' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
    req.user = decoded;
    next();
  });
}

// Middleware para verificar acceso de Administrador
function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user && req.user.rol === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
    }
  });
}

module.exports = { verifyToken, verifyAdmin };
