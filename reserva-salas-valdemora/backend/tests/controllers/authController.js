const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
require('dotenv').config({ path: '../.env' });

const register = async (req, res) => {
  try {
    const { name, email, password, roleName } = req.body;

    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      RoleId: role.id
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error en registro', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ include: Role, where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.Role.name },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '8h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en login', error });
  }
};

module.exports = { register, login };
