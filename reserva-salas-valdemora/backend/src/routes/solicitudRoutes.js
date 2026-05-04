const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  createSolicitud,
  getSolicitudes,
  updateSolicitud,
  deleteSolicitud
} = require('../controllers/solicitudController');

// Crear solicitud
router.post('/', authenticateToken, createSolicitud);

// Ver solicitudes
router.get('/', authenticateToken, getSolicitudes);

// Modificar solicitud (solo admin)
router.put('/:id', authenticateToken, updateSolicitud);

// Eliminar solicitud (solo admin)
router.delete('/:id', authenticateToken, deleteSolicitud);

module.exports = router;
