const { Sala, Centro } = require("../models");

const getSalas = async (req, res) => {
  try {
    const salas = await Sala.findAll({ include: Centro });
    res.json(salas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo salas", error });
  }
};

const createSala = async (req, res) => {
  try {
    const { nombre, capacidad, CentroId } = req.body;

    const centro = await Centro.findByPk(CentroId);
    if (!centro) {
      return res.status(404).json({ message: "Centro no encontrado" });
    }

    const sala = await Sala.create({ nombre, capacidad, CentroId });
    res.status(201).json(sala);
  } catch (error) {
    res.status(500).json({ message: "Error creando sala", error });
  }
};

const updateSala = async (req, res) => {
  try {
    const { id } = req.params;
    const sala = await Sala.findByPk(id);

    if (!sala) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    await sala.update(req.body);
    res.json(sala);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando sala", error });
  }
};

const deleteSala = async (req, res) => {
  try {
    const { id } = req.params;
    const sala = await Sala.findByPk(id);

    if (!sala) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    await sala.destroy();
    res.json({ message: "Sala eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando sala", error });
  }
};

module.exports = {
  getSalas,
  createSala,
  updateSala,
  deleteSala
};
