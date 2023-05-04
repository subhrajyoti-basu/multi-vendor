import mongoose from "mongoose";

// create PRODUCT schema
const vendorSchema = new mongoose.Schema(
  {
    company: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: Number,
    },
    bankInfo: {
      type: String,
    },
    userID: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

// create PRODUCT MODEL using PRODUCT schema
const vendorModel = mongoose.model("vendor", vendorSchema);
export default vendorModel;
