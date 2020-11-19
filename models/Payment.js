const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
