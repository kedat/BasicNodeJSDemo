import express from "express";
import jwtCheck from "../config/auth0Config.js";
import { bookVisit, updateBooking, getAllBookingByEmail } from "../controllers/bookingController.js";
const router = express.Router();

router.post("/create", jwtCheck, bookVisit);
router.get("/already-booked", jwtCheck, getAllBookingByEmail);
router.patch("/:bookingId", jwtCheck, updateBooking);

export { router as bookingRoute }