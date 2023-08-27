import asyncHandler from "express-async-handler";
import statusCode from "../constants/statusCode.js";
import { findUser, createNewUser } from "../services/userService.js";
import { createToken } from "../utils/createToken.js";

// function to create a new user
export const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await findUser(email);
  if (userExists) {
    res.status(statusCode.CREATED).send({ message: "This email is used" });
  } else {
    const user = await createNewUser(req.body);
    res.status(statusCode.OK).send({
      message: "Account registered successfully",
    });
  }
});

// function to login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser(email, password)
  if (user) {
    const token = createToken(user.id, email, user.isAdmin );
    res.status(statusCode.OK).send({ message: "Login successfully", token });
  } else {
    res.status(statusCode.NOT_FOUND).send({
      message: "Wrong email or password",
    });
  }
});
