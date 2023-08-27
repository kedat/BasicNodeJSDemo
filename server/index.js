import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { placeRoute } from './routes/placeRoute.js';
import { paymentRoute } from './routes/paymentRoute.js';
import { bookingRoute } from './routes/bookingRouter.js';
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoute)
app.use("/api/place", placeRoute)
app.use("/api/booking", bookingRoute)
app.use("/api/payment", paymentRoute)