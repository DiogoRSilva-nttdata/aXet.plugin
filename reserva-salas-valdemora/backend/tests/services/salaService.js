const { Sala } = require("../models");

const getAllSalas = async () => {
  return await Sala.findAll();
};

const createSala = async (data) => {
  return await Sala.create(data);
};

module.exports = {
  getAllSalas,
  createSala
};
