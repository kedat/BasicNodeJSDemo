import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const findUser = asyncHandler(async (email) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
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

export const getAlreadyBooked = asyncHandler(async (email) => {
  try {
    const bookedResidencies = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    return bookedResidencies;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getFavorite = asyncHandler(async (email) => {
  try {
    const allFavorites = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    return allFavorites;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const bookAVisit = asyncHandler(async (email, id, date) => {
  try {
    const bookResult = await prisma.user.update({
      where: { email: email },
      data: {
        bookedVisits: { push: { id, date } },
      },
    });
    return bookResult;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const updateBooking = asyncHandler(async (email, data) => {
  try {
    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: data,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

export const addFavorite = asyncHandler(async (email, id) => {
  try {
    const updatedFavorite = await prisma.user.update({
      where: { email },
      data: {
        favResidenciesID: {
          push: id,
        },
      },
    });
    return updatedFavorite;
  } catch (err) {
    throw new Error(err.message);
  }
});

export const removeFavorite = asyncHandler(async (email, user, rid) => {
  try {
    const updatedFavorite = await prisma.user.update({
      where: { email },
      data: {
        favResidenciesID: {
          set: user.favResidenciesID.filter((id) => id !== rid),
        },
      },
    });
    return updatedFavorite;
  } catch (err) {
    throw new Error(err.message);
  }
});

