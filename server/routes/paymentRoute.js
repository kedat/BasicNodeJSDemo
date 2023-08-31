const { checkout } = require("../controllers/paymentController");
const paymentRoute =  require("express").Router();

paymentRoute.post("/checkout", checkout);

module.exports = paymentRoute;

