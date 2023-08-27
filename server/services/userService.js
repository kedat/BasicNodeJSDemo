import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const findUser = asyncHandler(async (email, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { email, password } });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const createNewUser = asyncHandler(async (data) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
});
