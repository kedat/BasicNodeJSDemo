const asyncHandler = require("express-async-handler");

const { prisma } = require("../config/prismaConfig.js");

const findUser = asyncHandler(async (email, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { email, password } });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
});

const createNewUser = asyncHandler(async (data) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = {
  findUser, createNewUser
};
