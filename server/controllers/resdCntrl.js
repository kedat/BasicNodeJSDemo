import asyncHandler from "express-async-handler";
import { createResidencyService, getResidencies, getResidencyDetail } from "../services/resdService..js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    const residency = await createResidencyService({
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      owner: { connect: { email: userEmail } },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await getResidencies();
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await getResidencyDetail(id);
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
