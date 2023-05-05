import statusCode from "../config/statusCode.js";
import productModel from "../model/productModel.js";
import vendorModel from "../model/vendorModel.js";
import GetProductQuery from "../query/productQuery.js";
import asyncErr from "../utils/asyncErr.js";
import ErrorHandler from "../utils/errorHandler.js";

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
export const getSingleProduct = asyncErr(async (req, res, next) => {
  // initialize the query class
  const productQuery = new GetProductQuery();
  // get product
  const product = await productQuery.viewOnlySingleProduct(req.params.id);

  if (!product)
    throw new ErrorHandler("invalid product Id", statusCode.BADREQUEST);

  return res.status(statusCode.OK).json({
    success: true,
    message: `product fetch successful`,
    product,
  });
});

// GET PRODUCTS || GET (MULTIPLE)
export const getProducts = asyncErr(async (req, res, next) => {
  // initialize the query class
  const productQuery = new GetProductQuery();

  let products;
  let message;
  const vendorID = req.query.vendorID;

  // check if vendorID exists
  const vendor = await vendorModel.findOne({ _id: vendorID });

  // if(query as vendor) then return
  if (req.query.asVendor && req.query.vendorID && vendor) {
    products = await productQuery.viewOnlyVendorProducts(vendorID);
    message = `products under vendor ID ${vendorID}`;
  }

  // if there is no query for default case then return
  if (!req.query.asVendor || !req.query.vendorID) {
    products = await productQuery.publicProducts();
    message = `publicly available products`;
  }

  return res.status(statusCode.OK).json({
    success: true,
    message: message,
    products,
  });
});
