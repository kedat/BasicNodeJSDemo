const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const placeRoute  = require('./routes/placeRoute.js');
const  paymentRoute  = require('./routes/paymentRoute.js');
const  bookingRoute = require('./routes/bookingRouter.js');
const userRoute = require('./routes/userRoute.js');
const route = require("express").Router()
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

route.use('/api/user', userRoute)
route.use("/api/place", placeRoute)
route.use("/api/booking", bookingRoute)
route.use("/api/payment", paymentRoute)
app.use(route)

module.exports = app;