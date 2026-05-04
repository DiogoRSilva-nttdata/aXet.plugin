const { Historico } = require("../models");

const getAllHistorico = async () => {
  return await Historico.findAll();
};

const createHistorico = async (data) => {
  return await Historico.create(data);
};

module.exports = {
  getAllHistorico,
  createHistorico
};
