const { Historico } = require("../models");

const getHistorico = async (req, res) => {
  try {
    const historico = await Historico.findAll();
    res.json(historico);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo histórico", error });
  }
};

module.exports = {
  getHistorico
};
