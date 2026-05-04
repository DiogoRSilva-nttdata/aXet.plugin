const { Incidencia, Reserva, Historico } = require('../models');

// Crear incidencia
const crearIncidencia = async (req, res) => {
  try {
    const { ReservaId, tipo, descripcion } = req.body;

    if (!ReservaId || !tipo || !descripcion) {
      return res.status(400).json({ message: 'Campos obligatorios incompletos' });
    }

    const reserva = await Reserva.findByPk(ReservaId);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    const incidencia = await Incidencia.create({
      ReservaId,
      UserId: req.user.id,
      tipo,
      descripcion,
      estado: 'abierta'
    });

    // Registrar histórico
    await Historico.create({
      entidad: 'Incidencia',
      entidadId: incidencia.id,
      accion: 'CREAR',
      descripcion: `Incidencia creada sobre reserva ${ReservaId}`,
      UserId: req.user.id
    });

    res.status(201).json(incidencia);

  } catch (error) {
    res.status(500).json({ message: 'Error creando incidencia', error });
  }
};

// Cambiar estado incidencia
const cambiarEstadoIncidencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const incidencia = await Incidencia.findByPk(id);
    if (!incidencia) {
      return res.status(404).json({ message: 'Incidencia no encontrada' });
    }

    await incidencia.update({ estado });

    await Historico.create({
      entidad: 'Incidencia',
      entidadId: incidencia.id,
      accion: 'CAMBIO_ESTADO',
      descripcion: `Cambio de estado a ${estado}`,
      UserId: req.user.id
    });

    res.json(incidencia);

  } catch (error) {
    res.status(500).json({ message: 'Error actualizando incidencia', error });
  }
};

// Obtener incidencias
const getIncidencias = async (req, res) => {
  try {
    const incidencias = await Incidencia.findAll({
      include: [Reserva]
    });
    res.json(incidencias);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo incidencias', error });
  }
};

module.exports = {
  crearIncidencia,
  cambiarEstadoIncidencia,
  getIncidencias
};
