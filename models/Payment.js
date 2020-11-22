const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
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
