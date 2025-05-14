const jwt = require('jsonwebtoken');
const JWT_SECRET = 'segredo_super_secreto';

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ mensagem: 'Token ausente' });

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ mensagem: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
}

module.exports = autenticarToken;
