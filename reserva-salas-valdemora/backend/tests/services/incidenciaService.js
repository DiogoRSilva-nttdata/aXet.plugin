const { Incidencia } = require("../models");

const getAllIncidencias = async () => {
  return await Incidencia.findAll();
};

const createIncidencia = async (data) => {
  return await Incidencia.create(data);
};

const updateIncidenciaEstado = async (id, estado) => {
  const incidencia = await Incidencia.findByPk(id);
  if (!incidencia) return null;

  await incidencia.update({ estado });
  return incidencia;
};

module.exports = {
  getAllIncidencias,
  createIncidencia,
  updateIncidenciaEstado
};
