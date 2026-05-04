const { Centro } = require("../models");

const getCentros = async (req, res) => {
  try {
    const centros = await Centro.findAll();
    res.json(centros);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo centros", error });
  }
};

const createCentro = async (req, res) => {
  try {
    const centro = await Centro.create(req.body);
    res.status(201).json(centro);
  } catch (error) {
    res.status(500).json({ message: "Error creando centro", error });
  }
};

const updateCentro = async (req, res) => {
  try {
    const { id } = req.params;
    const centro = await Centro.findByPk(id);

    if (!centro) {
      return res.status(404).json({ message: "Centro no encontrado" });
    }

    await centro.update(req.body);
    res.json(centro);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando centro", error });
  }
};

const deleteCentro = async (req, res) => {
  try {
    const { id } = req.params;
    const centro = await Centro.findByPk(id);

    if (!centro) {
      return res.status(404).json({ message: "Centro no encontrado" });
    }

    await centro.destroy();
    res.json({ message: "Centro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando centro", error });
  }
};

module.exports = {
  getCentros,
  createCentro,
  updateCentro,
  deleteCentro
};
