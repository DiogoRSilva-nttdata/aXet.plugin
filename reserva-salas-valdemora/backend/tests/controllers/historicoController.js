const { Historico, User } = require('../models');

// Obtener histórico completo
const getHistorico = async (req, res) => {
  try {
    const historico = await Historico.findAll({
      include: [User],
      order: [['createdAt', 'DESC']]
    });

    res.json(historico);

  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo histórico', error });
  }
};

// Obtener histórico por entidad
const getHistoricoPorEntidad = async (req, res) => {
  try {
    const { entidad, entidadId } = req.params;

    const historico = await Historico.findAll({
      where: { entidad, entidadId },
      include: [User],
      order: [['createdAt', 'DESC']]
    });

    res.json(historico);

  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo histórico por entidad', error });
  }
};

module.exports = {
  getHistorico,
  getHistoricoPorEntidad
};
