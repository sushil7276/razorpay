import { Payment } from "../models/PaymentModel.js";
import { instance } from "../server.js"
import crypto from 'crypto';



export const checkout = async (req, res) => {

    const options = {
        // convert to rupee
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit (paisa)
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
}


export const paymentVerification = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // hmac_sha256(This algo use)
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {

        // Database Save
        await Payment.create({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        })

        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);

    }
    else {
        res.status(400).json({ success: false });
    }

}