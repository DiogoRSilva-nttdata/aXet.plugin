const { User, Role } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
    include: [{ model: Role }]
  });

  if (!user) return null;

  const passwordValida = await bcrypt.compare(password, user.password);
  if (!passwordValida) return null;

  const token = jwt.sign(
    {
      id: user.id,
      role: user.Role?.name
    },
    process.env.JWT_SECRET || "testsecret",
    { expiresIn: "1h" }
  );

  return { token };
};

module.exports = {
  login
};
