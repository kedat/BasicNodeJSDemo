const { jwtCheck } = require("../config/authConfig");
const { bookVisit, updateBookingStatus, getAllBookingByEmail, getBookingDetail } = require("../controllers/bookingController");
const { validateRequestBody } = require("../middleware/validateRequestBody");
const { bookAVisitSchema } = require("../validation/bookingSchema");
const bookingRoute = require("express").Router();

bookingRoute.post("/create", jwtCheck, validateRequestBody(bookAVisitSchema), bookVisit);
bookingRoute.get("/already-booked", jwtCheck, getAllBookingByEmail);
bookingRoute.get("/:bookingId", jwtCheck, getBookingDetail);
bookingRoute.patch("/:bookingId", jwtCheck, updateBookingStatus);

module.exports = bookingRoute
