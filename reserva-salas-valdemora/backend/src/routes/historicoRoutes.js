const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getHistorico
} = require('../controllers/historicoController');

router.get('/', authenticateToken, getHistorico);

module.exports = router;
