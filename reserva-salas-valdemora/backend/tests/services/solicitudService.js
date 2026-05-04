const { Solicitud } = require("../models");

const getAllSolicitudes = async () => {
  return await Solicitud.findAll();
};

const createSolicitud = async (data) => {
  return await Solicitud.create(data);
};

const updateSolicitudEstado = async (id, estado) => {
  const solicitud = await Solicitud.findByPk(id);
  if (!solicitud) return null;

  await solicitud.update({ estado });
  return solicitud;
};

module.exports = {
  getAllSolicitudes,
  createSolicitud,
  updateSolicitudEstado
};
