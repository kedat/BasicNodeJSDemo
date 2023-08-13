import asyncHandler from "express-async-handler";
import { getAlreadyBooked, bookAVisit, updateBooking, removeFavorite, getFavorite, addFavorite, findUser, createNewUser } from "../services/userService.js";

export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExists = await findUser(email)
  if (!userExists) {
    const user = await createNewUser(req.body);
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });
});

// function to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.params;
  try {
    const bookings = await getAlreadyBooked(email);
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to book a visit to resd
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date, id } = req.body;
  try {
    const booked = await getAlreadyBooked(email);
    if (booked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      const result = await bookAVisit(email, id, date);
      res.status(200).send({ message: "Your visit is booked successfully" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email, id } = req.body;
  try {
    const user = await getAlreadyBooked(email);
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await updateBooking(email, user.bookedVisits);
      res.status(200).send({ message: "Booking cancelled successfully" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to add a resd in favorite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email, id } = req.body;
  try {
    const user = await findUser(email);

    if (user.favResidenciesID.includes(id)) { 
      const updatedUser = await removeFavorite(email, user, id);
      res.send({ message: "Removed from favorites", user: updatedUser });
    } else {
      const updatedUser = await addFavorite(email, id);
      res.send({ message: "Updated favorites", user: updatedUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.params;
  try {
    const favResd = await getFavorite(email);
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});
