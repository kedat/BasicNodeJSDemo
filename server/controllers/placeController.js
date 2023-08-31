const asyncHandler = require("express-async-handler");
const { createPlaceService, getPlaces, getPlaceDetail, deleteAPlace } = require("../services/placeService");
const { decodeToken } = require("../utils/getUserDetail");
const statusCode = require("../constants/statusCode");

//function to create a new place
const createPlace = async (req, res) => {
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
};

// function to get all places
const getAllPlace = async (req, res) => {
  try {
    const allPlaces = await getPlaces();
    res.status(statusCode.OK).send(allPlaces);
  } catch (err) {
    throw new Error(err.message);
  }
};

// function to get a specific document/residency
const getPlace = async (req, res) => {
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
};

// function to delete place
const deletePlace = async (req, res) => {
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
};

module.exports = {
  deletePlace, getPlace, getAllPlace, createPlace
};
