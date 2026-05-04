const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  createReserva,
  getReservas,
  deleteReserva
} = require('../controllers/reservaController');

router.post('/', authenticateToken, createReserva);

router.get('/', authenticateToken, getReservas);

router.delete('/:id', authenticateToken, deleteReserva);
module.exports = router;
