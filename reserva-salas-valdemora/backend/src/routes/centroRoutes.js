const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const {
  createCentro,
  getCentros,
  updateCentro,
  deleteCentro
} = require('../controllers/centroController');

// Crear centro (solo admin)
router.post(
  '/',
  authenticateToken,
  authorizeRole(['admin']),
  createCentro
);

// Obtener centros (usuarios autenticados)
router.get(
  '/',
  authenticateToken,
  getCentros
);

// Actualizar centro (solo admin)
router.put(
  '/:id',
  authenticateToken,
  authorizeRole(['admin']),
  updateCentro
);

// Eliminar centro (solo admin)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole(['admin']),
  deleteCentro
);

module.exports = router;
