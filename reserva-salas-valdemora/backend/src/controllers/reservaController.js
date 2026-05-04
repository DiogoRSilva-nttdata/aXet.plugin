const { Reserva, Solicitud } = require("../models");

const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({ include: Solicitud });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo reservas", error });
  }
};

const createReserva = async (req, res) => {
  try {
    const { SolicitudId, fecha } = req.body;

    const solicitud = await Solicitud.findByPk(SolicitudId);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    const reserva = await Reserva.create({ SolicitudId, fecha });
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error creando reserva", error });
  }
};

const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    await reserva.destroy();
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando reserva", error });
  }
};

module.exports = {
  getReservas,
  createReserva,
  deleteReserva
};
