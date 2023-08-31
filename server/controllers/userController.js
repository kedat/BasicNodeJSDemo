const asyncHandler = require("express-async-handler");
const statusCode = require("../constants/statusCode");
const { findUser, createNewUser } = require("../services/userService");
const { createToken } = require("../utils/createToken");

// function to create a new user
const createUser = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await findUser(email);
  if (userExist) {
    res.status(statusCode.CREATED).send({ message: "This email is used" });
  } else {
    const user = await createNewUser(req.body);
    res.status(statusCode.OK).send({ message: "Account registered successfully" });
  }
};

// function to login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser(email, password)
  if (user) {
    const token = createToken(user.id, email, user.isAdmin);
    res.status(statusCode.OK).send({ message: "Login successfully", token });
  } else {
    res.status(statusCode.NOT_FOUND).send({ message: "Wrong email or password" });
  }
};

module.exports = {
  createUser, loginUser
};
