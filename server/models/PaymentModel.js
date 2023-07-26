import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({

    razorpay_payment_id: {
        type: String
    },

    razorpay_order_id: {
        type: String
    },

    razorpay_signature: {
        type: String
    }
});



export const Payment = mongoose.model("Payment", paymentSchema);