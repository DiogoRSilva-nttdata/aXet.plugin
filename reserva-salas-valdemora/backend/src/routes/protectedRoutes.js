const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

router.get('/perfil', authenticateToken, (req, res) => {
  res.json({
    message: 'Acceso autorizado',
    user: req.user
  });
});

router.get(
  '/admin',
  authenticateToken,
  authorizeRole(['admin']),
  (req, res) => {
    res.json({
      message: 'Zona exclusiva para administradores'
    });
  }
);

module.exports = router;
