import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidencyService = asyncHandler(async (data) => {
  try {
    const user = await prisma.residency.create({ data });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getResidencies = asyncHandler(async () => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return residencies;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getResidencyDetail = asyncHandler(async (id) => {
  try {
    const detail = await prisma.residency.findUnique({
      where: { id },
    });
    return detail;
  } catch (err) {
    throw new Error(err.message);
  }
});