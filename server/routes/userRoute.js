import express from "express";
import jwtCheck from "../config/auth0Config.js";
import {
  bookVisit,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFavorites,
  toFav,
} from "../controllers/userCntrl.js";
const router = express.Router();

router.post("/register",jwtCheck, createUser);
router.post("/bookVisit", jwtCheck, bookVisit);
router.get("/allBookings/:email", getAllBookings);
router.post("/removeBooking", jwtCheck, cancelBooking);
router.post("/toFav", jwtCheck, toFav);
router.get("/allFav/:email", getAllFavorites);

export { router as userRoute };
