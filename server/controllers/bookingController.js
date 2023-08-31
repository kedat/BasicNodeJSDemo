const { decodeToken } = require("../utils/getUserDetail");
const statusCode = require("../constants/statusCode");
const { getPlaceDetail } = require("../services/placeService");
const { bookAVisit, getBookingByEmail, getBookingDetailService, isBooked, updateABooking } = require("../services/bookingService");

// function to book a visit 
const bookVisit = async (req, res) => {
  const { placeId, date } = req.body;
  const userDetail = await decodeToken(req.headers.authorization.slice(7));

  const currentDate = new Date();
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
};

// function to get all booking of a user
const getAllBookingByEmail = async (req, res) => {
  const userDetail = await decodeToken(req.headers.authorization.slice(7))
  try {
    const bookings = await getBookingByEmail(userDetail.email);
    res.status(statusCode.OK).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
};

// function to get booking detail
const getBookingDetail = async (req, res) => {
  const userDetail = await decodeToken(req.headers.authorization.slice(7));
  const { bookingId } = req.params;
  try {
    const booking = await getBookingDetail(bookingId);
    if (userDetail.isAdmin || userDetail.email === booking.userEmail)
      res.status(statusCode.OK).send(bookings);
    else
      res.status(statusCode.BAD_REQUEST).send({ message: "You can not see this booking!" });
  } catch (err) {
    throw new Error(err.message);
  }
};

// function to cancel the booking
const updateBookingStatus = async (req, res) => {
  const userDetail = await decodeToken(req.headers.authorization.slice(7))

  const { bookingId } = req.params;
  const { status } = req.body;
  try {
    const bookingDetail = await getBookingDetailService(bookingId);
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
            res.status(statusCode.BAD_REQUEST).json({ message: "Invalid status" });
          }
        }
      };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  bookVisit,
  getAllBookingByEmail,
  getBookingDetail,
  updateBookingStatus,
};
