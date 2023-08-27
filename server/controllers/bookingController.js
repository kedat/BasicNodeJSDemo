import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { decodeToken } from "../utils/getUserDetail.js";
import statusCode from "../constants/statusCode.js";
import ConvertUTCToBrowserTime from "../utils/ConvertUTCToBrowserTime.js";
import { getPlaceDetail } from "../services/placeService.js";
import { bookAVisit, getBookingByEmail, getBookingDetail, isBooked, updateABooking } from "../services/bookingService.js";

// function to book a visit 
export const bookVisit = asyncHandler(async (req, res) => {
  const { placeId, date } = req.body;
  const userDetail = await decodeToken(req.headers.authorization.slice(7));

  const currentDate = new Date();
  if (date <= ConvertUTCToBrowserTime(currentDate)) {
    res
      .status(statusCode.CONFLICT)
      .json({ message: "Date must be greater than today" });
  }
  try {
    const placeDetail = await getPlaceDetail(placeId);
    if (!placeDetail) {
      res
        .status(statusCode.NOT_FOUND)
        .json({ message: "Place not found" });
    }
    const alreadyBooked = await isBooked(userDetail.email, placeId, date);
    if (alreadyBooked) {
      res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "This place is already booked by you" });
    } else {
      const result = await bookAVisit({
        placeId, date, status: "Create", price: placeDetail.price,
        place: { connect: { address: placeDetail.address } },
        booked: { connect: { email: userDetail.email } }
      });
      res.status(statusCode.OK).send({ message: "Your visit is booked successfully", result });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all bookings of a user
export const getAllBookingByEmail = asyncHandler(async (req, res) => {
  const userDetail = await decodeToken(req.headers.authorization.slice(7))
  try {
    const bookings = await getBookingByEmail(userDetail.email);
    res.status(statusCode.OK).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the booking
export const updateBooking = asyncHandler(async (req, res) => {
  const userDetail = await decodeToken(req.headers.authorization.slice(7))

  const { bookingId } = req.params;
  const { status } = req.body;
  try {
    const bookingDetail = await getBookingDetail(bookingId);
    if (!bookingDetail) {
      res.status(statusCode.NOT_FOUND).json({ message: "Booking not found" });
    } else {
      if ((bookingDetail.userEmail !== userDetail.email && !userDetail.isAdmin) || bookingDetail.status !== "Create") {
        res.status(statusCode.BAD_REQUEST).json({ message: "You can not update this booking!" });
      }
      else {
        if (status === "Cancel") {
          await updateABooking({ bookingId, status });
          res.status(statusCode.OK).send({ message: "Booking cancelled" });
        }
        else {
          if (status === "Happened" && userDetail.isAdmin) {
            await updateABooking({ bookingId, status });
            res.status(statusCode.OK).send({ message: "Booking updated" });
          }
          else {
            res.status(statusCode.BAD_REQUEST).json({ message: "You can not update this booking!" });
          }
        }
      };
    }
  } catch (err) {
    throw new Error(err.message);
  }
});