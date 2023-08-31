const { createUser, loginUser } = require("../controllers/userController");
const jwtCheck = require("../config/authConfig");
const { registerSchema, loginSchema } = require("../validation/userSchema");
const { validateRequestBody } = require("../middleware/validateRequestBody");
const userRoute = require("express").Router();

userRoute.post("/register", validateRequestBody(registerSchema), createUser);
userRoute.post("/login", validateRequestBody(loginSchema), loginUser);

module.exports = userRoute;
