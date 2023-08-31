const { jwtCheck } = require("../config/authConfig");
const { createPlace, getAllPlace, getPlace, deletePlace } = require("../controllers/placeController");
const { validateRequestBody } = require("../middleware/validateRequestBody");
const { createPlaceSchema } = require("../validation/placeSchema");
const placeRoute =  require("express").Router();

placeRoute.post("/create", jwtCheck, validateRequestBody(createPlaceSchema), createPlace);
placeRoute.get("/allPlace", getAllPlace);
placeRoute.get("/:placeId", getPlace);
placeRoute.delete("/:placeId", jwtCheck, deletePlace);

module.exports = placeRoute;
