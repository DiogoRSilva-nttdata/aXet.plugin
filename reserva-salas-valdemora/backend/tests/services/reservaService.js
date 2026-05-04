const { Reserva } = require("../models");

const getAllReservas = async () => {
  return await Reserva.findAll();
};

const createReserva = async (data) => {
  return await Reserva.create(data);
};

const deleteReservaBySolicitud = async (solicitudId) => {
  const reserva = await Reserva.findOne({ where: { SolicitudId: solicitudId } });
  if (!reserva) return null;

  await reserva.destroy();
  return true;
};

module.exports = {
  getAllReservas,
  createReserva,
  deleteReservaBySolicitud
};
