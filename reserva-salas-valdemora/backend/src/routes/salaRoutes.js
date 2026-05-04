const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const {
  createSala,
  getSalas,
  updateSala,
  deleteSala
} = require('../controllers/salaController');

// Crear sala (solo admin)
router.post(
  '/',
  authenticateToken,
  authorizeRole(['admin']),
  createSala
);

// Obtener salas (usuarios autenticados)
router.get(
  '/',
  authenticateToken,
  getSalas
);

// Actualizar sala (solo admin)
router.put(
  '/:id',
  authenticateToken,
  authorizeRole(['admin']),
  updateSala
);

// Eliminar sala (solo admin)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole(['admin']),
  deleteSala
);

module.exports = router;
