const { Incidencia } = require("../models");

const getIncidencias = async (req, res) => {
  try {
    const incidencias = await Incidencia.findAll();
    res.json(incidencias);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo incidencias", error });
  }
};

const createIncidencia = async (req, res) => {
  try {
    const incidencia = await Incidencia.create(req.body);
    res.status(201).json(incidencia);
  } catch (error) {
    res.status(500).json({ message: "Error creando incidencia", error });
  }
};

const updateIncidencia = async (req, res) => {
  try {
    const { id } = req.params;
    const incidencia = await Incidencia.findByPk(id);

    if (!incidencia) {
      return res.status(404).json({ message: "Incidencia no encontrada" });
    }

    await incidencia.update(req.body);
    res.json(incidencia);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando incidencia", error });
  }
};

const deleteIncidencia = async (req, res) => {
  try {
    const { id } = req.params;
    const incidencia = await Incidencia.findByPk(id);

    if (!incidencia) {
      return res.status(404).json({ message: "Incidencia no encontrada" });
    }

    await incidencia.destroy();
    res.json({ message: "Incidencia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando incidencia", error });
  }
};

module.exports = {
  getIncidencias,
  createIncidencia,
  updateIncidencia,
  deleteIncidencia
};
