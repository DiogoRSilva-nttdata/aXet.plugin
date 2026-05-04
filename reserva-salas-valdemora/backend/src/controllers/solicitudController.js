const { Solicitud, Sala, User } = require("../models");

const getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll({ include: [Sala, User] });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo solicitudes", error });
  }
};

const createSolicitud = async (req, res) => {
  try {
    const { SalaId, fecha, horaInicio, horaFin, tipoActividad } = req.body;

    if (!SalaId || !fecha || !horaInicio || !horaFin || !tipoActividad) {
      return res.status(400).json({ message: "Campos obligatorios incompletos" });
    }

    const sala = await Sala.findByPk(SalaId);
    if (!sala) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    const solicitud = await Solicitud.create({
      SalaId,
      UserId: req.user?.id,
      fecha,
      horaInicio,
      horaFin,
      tipoActividad,
      estado: "pendiente"
    });

    res.status(201).json(solicitud);
  } catch (error) {
    res.status(500).json({ message: "Error creando solicitud", error });
  }
};

const updateSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.findByPk(id);

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    await solicitud.update(req.body);
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando solicitud", error });
  }
};

const deleteSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.findByPk(id);

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    await solicitud.destroy();
    res.json({ message: "Solicitud eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando solicitud", error });
  }
};

module.exports = {
  getSolicitudes,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud
};
