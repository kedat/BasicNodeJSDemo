const asyncHandler = require("express-async-handler");
const { prisma } = require("../config/prismaConfig.js");

const isBooked = asyncHandler(async (userEmail, placeId, date) => {
  try {
    const alreadyBooked = await prisma.booking.findFirst({
      where: { userEmail, status: "Create", placeId, date },
    });
    if (alreadyBooked)
      return true;
    else
      return false
  } catch (err) {
    throw new Error(err.message);
  }
});

const bookAVisit = asyncHandler(async (data) => {
  try {
    const bookResult = await prisma.booking.create({ data });
    return bookResult;
  } catch (err) {
    throw new Error(err.message);
  }
});

const getBookingByEmail = asyncHandler(async (userEmail) => {
  try {
    const bookedList = await prisma.booking.findMany({
      where: { userEmail },
    });
    return bookedList;
  } catch (err) {
    throw new Error(err.message);
  }
});

const getBookingDetailService = asyncHandler(async (bookingID) => {
  try {
    const bookingDetail = await prisma.booking.findUnique({
      where: { id: bookingID },
    });
    return bookingDetail;
  } catch (err) {
    throw new Error(err.message);
  }
});

const updateABooking = asyncHandler(async ({ bookingId, status }) => {
  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });
  } catch (err) {
    throw new Error(err.message);
  }
});


module.exports = {
  isBooked,
  bookAVisit,
  getBookingByEmail,
  getBookingDetailService,
  updateABooking,
};