import mongoose from "mongoose";

// create PRODUCT schema
const productSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    description: {
      required: true,
      type: String,
    },
    vendorID: {
      required: true,
      type: mongoose.Types.ObjectId,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// create PRODUCT MODEL using PRODUCT schema
const productModel = mongoose.model("product", productSchema);
export default productModel;
