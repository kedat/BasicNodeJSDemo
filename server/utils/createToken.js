const jwt = require("jsonwebtoken");

const createToken = (id, email, isAdmin) => {
  const token = jwt.sign({ id, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token;
};

module.exports = {
  createToken
};