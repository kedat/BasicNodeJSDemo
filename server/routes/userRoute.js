import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

export { router as userRoute };
