import statusCode from "../config/statusCode.js";
import productModel from "../model/productModel.js";
import asyncErr from "../utils/asyncErr.js";

// ADD PRODUCT || POST
export const addProduct = asyncErr(async (req, res, next) => {
  // destructure the request
  const { name, price, description } = req.body;

  // get vendor ID from middleware or query
  const vendorID = req.vendor.id;
  // add product to database
  const product = await new productModel({
    name,
    price,
    description,
    vendorID,
  }).save();

  // response sent to client
  return res.status(statusCode.CREATED).json({
    success: true,
    message: "new product added",
    product,
  });
});
// UPDATE PRODUCT || PUT
// DELETE PRODUCT || DELETE
// GET PRODUCT || GET
// GET PRODUCTS || GET (MULTIPLE)
