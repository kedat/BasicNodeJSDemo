import asyncHandler from "express-async-handler";
import { createPlaceService, getPlaces, getPlaceDetail, deleteAPlace } from "../services/placeService.js";
import jwt from "jsonwebtoken";
import { decodeToken } from "../utils/getUserDetail.js";
import statusCode from "../constants/statusCode.js";
import ConvertUTCToBrowserTime from "../utils/ConvertUTCToBrowserTime.js";

//function to create a new place
export const createPlace = asyncHandler(async (req, res) => {
  const userDetail = await decodeToken(req.headers.authorization.slice(7))
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
  } = req.body;

  try {
    const place = await createPlaceService({
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      owner: { connect: { email: userDetail.email } },
    });

    res.status(statusCode.OK).send({ message: "Place created successfully", place });
  } catch (err) {
    res.status(statusCode.CONFLICT).send({ message: "A place with address already there" });
  }
});

// function to get all places
export const getAllPlace = asyncHandler(async (req, res) => {
  try {
    const allPlaces = await getPlaces();
    res.status(statusCode.OK).send(allPlaces);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get a specific document/residency
export const getPlace = asyncHandler(async (req, res) => {
  const { placeId } = req.params;
  try {
    const placeDetail = await getPlaceDetail(placeId);
    if (placeDetail)
      res.status(statusCode.OK).send(placeDetail);
    else
      res.status(statusCode.NOT_FOUND).send({ message: "Place not found" })
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to delete place
export const deletePlace = asyncHandler(async (req, res) => {
  const userDetail = await decodeToken(req.headers.authorization.slice(7))
  const { placeId } = req.params;

  try {
    const placeDetail = await getPlaceDetail(placeId);
    if (placeDetail) {
      if (userDetail.isAdmin || userDetail.email === placeDetail.userEmail) {
        await deleteAPlace(placeId);
        res.status(statusCode.OK).send({ message: "Place deleted" });
      }
      else {
        res.status(statusCode.BAD_REQUEST).send({ message: "You can not delete this place" });
      }
    }
    else
      res.status(statusCode.NOT_FOUND).send({ message: "Place not found" });
  } catch (err) {
    throw new Error(err.message);
  }
});
