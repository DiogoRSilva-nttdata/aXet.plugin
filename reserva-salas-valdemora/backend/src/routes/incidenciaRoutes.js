const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  createIncidencia,
  updateIncidencia,
  getIncidencias,
  deleteIncidencia
} = require('../controllers/incidenciaController');

router.post('/', authenticateToken, createIncidencia);
router.put('/:id', authenticateToken, updateIncidencia);
router.get('/', authenticateToken, getIncidencias);
router.delete('/:id', authenticateToken, deleteIncidencia);

module.exports = router;
