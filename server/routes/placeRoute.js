import express from "express";
import { createPlace, getAllPlace, getPlace, deletePlace } from "../controllers/placeController.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/create", jwtCheck, createPlace);
router.get("/allPlace", getAllPlace);
router.get("/:placeId", getPlace);
router.delete("/:placeId",jwtCheck, deletePlace);

export { router as placeRoute }