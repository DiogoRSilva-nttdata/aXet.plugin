// Backend principal - App configuration

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const centroRoutes = require('./routes/centroRoutes');
const salaRoutes = require('./routes/salaRoutes');
const solicitudRoutes = require('./routes/solicitudRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const incidenciaRoutes = require('./routes/incidenciaRoutes');
const historicoRoutes = require('./routes/historicoRoutes');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/centros', centroRoutes);
app.use('/api/salas', salaRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/incidencias', incidenciaRoutes);
app.use('/api/historico', historicoRoutes);

app.get('/', (req, res) => {
  res.send('API Reserva de Salas - Ayuntamiento de Valdemora');
});

module.exports = app;
