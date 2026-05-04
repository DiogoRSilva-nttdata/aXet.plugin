const { Sala, User, Reserva, Historico } = require('../models');
const solicitudService = require('../services/solicitudService');

const ESTADOS_VALIDOS = [
  'pendiente',
  'en_revision',
  'aceptada',
  'rechazada',
  'cancelada'
];

// Crear solicitud
const createSolicitud = async (req, res) => {
  try {
    const { SalaId, fecha, horaInicio, horaFin, tipoActividad } = req.body;

    if (!SalaId || !fecha || !horaInicio || !horaFin || !tipoActividad) {
      return res.status(400).json({ message: 'Campos obligatorios incompletos' });
    }

    const fechaSolicitud = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    if (fechaSolicitud < hoy) {
      return res.status(400).json({ message: 'No se puede crear solicitud en fecha pasada' });
    }

    if (horaFin <= horaInicio) {
      return res.status(400).json({ message: 'horaFin debe ser mayor que horaInicio' });
    }

    const sala = await Sala.findByPk(SalaId);
    if (!sala) {
      return res.status(404).json({ message: 'Sala no encontrada' });
    }

    const solicitud = await solicitudService.createSolicitud({
      SalaId,
      UserId: req.user.id,
      fecha,
      horaInicio,
      horaFin,
      tipoActividad,
      estado: 'pendiente'
    });

    res.status(201).json(solicitud);

  } catch (error) {
    res.status(500).json({ message: 'Error creando solicitud', error });
  }
};

// Ver solicitudes
const getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await solicitudService.getAllSolicitudes();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo solicitudes', error });
  }
};

// Cambiar estado (admin + gestor)
const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!ESTADOS_VALIDOS.includes(estado)) {
      return res.status(400).json({ message: 'Estado no válido' });
    }

    if (!['admin', 'gestor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'No autorizado para cambiar estado' });
    }

    const solicitud = await solicitudService.updateSolicitudEstado(id, estado);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.json(solicitud);

  } catch (error) {
    res.status(500).json({ message: 'Error cambiando estado', error });
  }
};

// Cancelar propia solicitud (máximo 10 minutos)
const cancelarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;

    const solicitud = await Solicitud.findByPk(id);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    if (solicitud.UserId !== req.user.id) {
      return res.status(403).json({ message: 'Solo puedes cancelar tu propia solicitud' });
    }

    const ahora = new Date();
    const creada = new Date(solicitud.createdAt);
    const diffMin = (ahora - creada) / 1000 / 60;

    if (diffMin > 10) {
      return res.status(400).json({ message: 'Tiempo máximo de cancelación superado' });
    }

    await solicitud.update({ estado: 'cancelada' });

    res.json(solicitud);

  } catch (error) {
    res.status(500).json({ message: 'Error cancelando solicitud', error });
  }
};

// Ajuste manual de prioridad (admin + gestor)
const aplicarPrioridad = async (req, res) => {
  try {
    const { id } = req.params;
    const { prioridad } = req.body;

    if (!['admin', 'gestor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'No autorizado para cambiar prioridad' });
    }

    const solicitud = await Solicitud.findByPk(id);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    await solicitud.update({ prioridad });

    res.json(solicitud);

  } catch (error) {
    res.status(500).json({ message: 'Error aplicando prioridad', error });
  }
};

const updateSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, SalaId } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Solo admin puede modificar solicitudes" });
    }

    const solicitud = await Solicitud.findByPk(id);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    if (estado && ESTADOS_VALIDOS.includes(estado)) {
      solicitud.estado = estado;
    }

    if (SalaId) {
      const sala = await Sala.findByPk(SalaId);
      if (!sala) {
        return res.status(404).json({ message: "Sala no encontrada" });
      }
      solicitud.SalaId = SalaId;
    }

    await solicitud.save();

    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando solicitud", error });
  }
};

const deleteSolicitud = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Solo admin puede eliminar solicitudes" });
    }

    const solicitud = await Solicitud.findByPk(id);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    // Eliminar reserva asociada si existe
    const reserva = await Reserva.findOne({ where: { SolicitudId: solicitud.id } });
    if (reserva) {
      await reserva.destroy();
    }

    // Registrar en histórico
    await Historico.create({
      entidad: "Solicitud",
      entidadId: solicitud.id,
      accion: "ELIMINAR",
      descripcion: `Solicitud eliminada por admin (fecha: ${solicitud.fecha}, estado: ${solicitud.estado})`,
      UserId: req.user.id
    });

    await solicitud.destroy();

    res.json({ message: "Solicitud eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando solicitud", error });
  }
};

module.exports = {
  createSolicitud,
  getSolicitudes,
  cambiarEstado,
  cancelarSolicitud,
  aplicarPrioridad,
  updateSolicitud,
  deleteSolicitud
};
