import mongoose from "mongoose";

// create Order Schema
const orderSchema = new mongoose.Schema(
  {
    customerID: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    vendorID: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    productID: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    quantity: {
      required: true,
      type: Number,
    },
    state: {
      required: true,
      type: String,
      default: "placed",
    },
    totalPrice: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
