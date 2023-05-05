import statusCode from "../config/statusCode.js";
import { isVendor } from "../middleware/authMiddleware.js";
import orderModel from "../model/orderModel.js";
import vendorModel from "../model/vendorModel.js";
import GetOrderQuery from "../query/orderQuery.js";
import GetProductQuery from "../query/productQuery.js";
import asyncErr from "../utils/asyncErr.js";
import ErrorHandler from "../utils/errorHandler.js";

// place order [CREATE ORDER] controller || POST -> CUSTOMER
export const placeOrder = asyncErr(async (req, res, next) => {
  // initialize query classes
  const productQuery = new GetProductQuery();

  // destructuring the data
  const customerID = req.user.id;
  const { productID } = req.query;
  const { quantity } = req.body;

  // check vendor and product ID is not null
  if (!quantity || !productID)
    throw new ErrorHandler(
      "single or multiple required values are null",
      statusCode.BADREQUEST
    );
  const { price, vendorID } = await productQuery.viewOnlySingleProduct(
    productID
  );
  // calculate totalPrice
  const totalPrice = quantity * price;

  // send the data to the database
  const newOrder = await new orderModel({
    customerID,
    vendorID,
    productID,
    quantity,
    totalPrice,
  }).save();
  // on success
  return res.status(statusCode.CREATED).json({
    success: true,
    message: "new order created successfully",
    order: newOrder,
  });
});

// get ORDER || GET -> VENDOR, CUSTOMER
export const getOrders = asyncErr(async (req, res, next) => {
  // initialize data & query class
  const orderQuery = new GetOrderQuery();
  let orders;
  let message;
  // data need to query as a vendor || asVendor,
  if (req.query.asVendor) {
    // check if vendorID exists
    const vendor = await vendorModel.findOne({ userID: req.user.id });
    // get data from database
    orders = await orderQuery.newOrdersToVendor(vendor._id);
    message = "placed orders to vendor " + vendor._id;
  }

  // query as a customer
  if (!req.query.asVendor || req.query.asCustomer) {
    // get data from database
    orders = await orderQuery.activeOrdersToCustomer(req.user.id);
    message = "placed orders view to customer " + req.user.id;
  }

  // send response of the orders
  return res.status(statusCode.OK).json({
    success: true,
    message,
    orders,
  });
});
