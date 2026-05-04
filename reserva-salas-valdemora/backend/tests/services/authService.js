const { User, Role } = require("../models");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
    include: Role
  });

  if (!user) return null;

  // Nota: aquí debería ir hash real en producción
  if (user.password !== password) return null;

  const token = jwt.sign(
    {
      id: user.id,
      role: user.Role?.nombre
    },
    process.env.JWT_SECRET || "testsecret",
    { expiresIn: "1h" }
  );

  return { token, user };
};

module.exports = {
  login
};
