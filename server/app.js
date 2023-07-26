import express from "express";
import { config } from "dotenv";
import router from "./routes/PaymentRoute.js";
import corse from 'cors';



config({ path: "./config/config.env" });

export const app = express();

app.use(corse());
app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.use("/api", router);

// razorpay key pass to frontend by url
app.get('/api/getkey', (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});