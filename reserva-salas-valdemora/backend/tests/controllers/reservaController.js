const { Reserva, Solicitud, User, Sala } = require('../models');
const { Op } = require('sequelize');

// Confirmar solicitud → crear reserva
const confirmarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;

    if (!['admin', 'gestor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'No autorizado para confirmar solicitudes' });
    }

    const solicitud = await Solicitud.findByPk(id);

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    if (solicitud.estado !== 'pendiente' && solicitud.estado !== 'en_revision') {
      return res.status(400).json({ message: 'La solicitud no puede confirmarse en su estado actual' });
    }

    // Buscar posibles solapamientos
    const reservasExistentes = await Reserva.findAll({
      include: {
        model: Solicitud,
        where: {
          fecha: solicitud.fecha,
          SalaId: solicitud.SalaId,
          horaInicio: { [Op.lt]: solicitud.horaFin },
          horaFin: { [Op.gt]: solicitud.horaInicio }
        }
      }
    });

    if (reservasExistentes.length > 0) {
      return res.status(400).json({ message: 'Existe solapamiento con otra reserva confirmada' });
    }

    // Crear reserva
    const reserva = await Reserva.create({
      SolicitudId: solicitud.id
    });

    await solicitud.update({ estado: 'aceptada' });

    res.status(201).json({
      message: 'Reserva creada correctamente',
      reserva
    });

  } catch (error) {
    res.status(500).json({ message: 'Error confirmando solicitud', error });
  }
};

// Consultar disponibilidad
const verificarDisponibilidad = async (req, res) => {
  try {
    const { SalaId, fecha, horaInicio, horaFin } = req.query;

    const reservas = await Reserva.findAll({
      include: {
        model: Solicitud,
        where: {
          fecha,
          SalaId,
          horaInicio: { [Op.lt]: horaFin },
          horaFin: { [Op.gt]: horaInicio }
        }
      }
    });

    res.json({
      disponible: reservas.length === 0
    });

  } catch (error) {
    res.status(500).json({ message: 'Error verificando disponibilidad', error });
  }
};

const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: {
        model: Solicitud,
        include: [User, Sala]
      }
    });

    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo reservas", error });
  }
};

module.exports = {
  confirmarSolicitud,
  verificarDisponibilidad,
  getReservas
};
