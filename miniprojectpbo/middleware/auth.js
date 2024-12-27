const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).send('Token is required');
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  next();
};

module.exports = { verifyToken, verifyAdmin };
