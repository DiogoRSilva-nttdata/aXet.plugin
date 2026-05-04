const authService = require("../services/authService");
const { User, Role } = require("../models");

// Registro (simple)
const register = async (req, res) => {
  try {
    const { nombre, email, password, roleNombre } = req.body;

    if (!nombre || !email || !password || !roleNombre) {
      return res.status(400).json({ message: "Campos obligatorios incompletos" });
    }

    const role = await Role.findOne({ where: { nombre: roleNombre } });
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    const user = await User.create({
      nombre,
      email,
      password,
      RoleId: role.id
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error registrando usuario", error });
  }
};

// Login usando authService
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password obligatorios" });
    }

    const result = await authService.login(email, password);

    if (!result) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error en login", error });
  }
};

module.exports = {
  register,
  login
};
