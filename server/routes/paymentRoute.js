import express from "express";

import { checkout } from "../controllers/paymentCntrl.js";
const router = express.Router();

router.post("/checkout", checkout);

export { router as paymentRoute };
