const { Centro } = require("../models");

const getAllCentros = async () => {
  return await Centro.findAll();
};

const createCentro = async (data) => {
  return await Centro.create(data);
};

const updateCentro = async (id, data) => {
  const centro = await Centro.findByPk(id);
  if (!centro) return null;

  await centro.update(data);
  return centro;
};

const deleteCentro = async (id) => {
  const centro = await Centro.findByPk(id);
  if (!centro) return null;

  await centro.destroy();
  return true;
};

module.exports = {
  getAllCentros,
  createCentro,
  updateCentro,
  deleteCentro
};
