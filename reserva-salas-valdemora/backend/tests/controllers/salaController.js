const { Centro } = require('../models');
const salaService = require('../services/salaService');

const createSala = async (req, res) => {
  try {
    const { nombre, capacidad, CentroId } = req.body;

    const centro = await Centro.findByPk(CentroId);
    if (!centro) {
      return res.status(404).json({ message: 'Centro no encontrado' });
    }

    const sala = await salaService.createSala({ nombre, capacidad, CentroId });
    res.status(201).json(sala);
  } catch (error) {
    res.status(500).json({ message: 'Error creando sala', error });
  }
};

const getSalas = async (req, res) => {
  try {
    const salas = await salaService.getAllSalas();
    res.json(salas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo salas', error });
  }
};

const updateSala = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, capacidad } = req.body;

    const sala = await salaService.getAllSalas().then(salas =>
      salas.find(s => s.id == id)
    );

    if (!sala) {
      return res.status(404).json({ message: 'Sala no encontrada' });
    }

    await sala.update({ nombre, capacidad });
    res.json(sala);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando sala', error });
  }
};

const deleteSala = async (req, res) => {
  try {
    const { id } = req.params;

    const sala = await salaService.getAllSalas().then(salas =>
      salas.find(s => s.id == id)
    );

    if (!sala) {
      return res.status(404).json({ message: 'Sala no encontrada' });
    }

    await sala.destroy();
    res.json({ message: 'Sala eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando sala', error });
  }
};

module.exports = {
  createSala,
  getSalas,
  updateSala,
  deleteSala
};
