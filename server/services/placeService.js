const asyncHandler = require("express-async-handler");
const { prisma } = require("../config/prismaConfig.js");

const createPlaceService = asyncHandler(async (data) => {
  try {
    const place = await prisma.place.create({ data });
    return place;
  } catch (err) {
    throw new Error(err.message);
  }
});

const getPlaces = asyncHandler(async () => {
  try {
    const places = await prisma.place.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return places;
  } catch (err) {
    throw new Error(err.message);
  }
});

const getPlaceDetail = asyncHandler(async (placeId) => {
  try {
    const detail = await prisma.place.findUnique({
      where: { id: placeId },
    });
    return detail;
  } catch (err) {
    throw new Error(err.message);
  }
});

const deleteAPlace = asyncHandler(async (placeId) => {
  try {
    const detail = await prisma.place.delete({
      where: { id: placeId },
    });
    return detail;
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = {
  createPlaceService,
  getPlaces,
  getPlaceDetail,
  deleteAPlace,
};