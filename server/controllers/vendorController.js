import statusCode from "../config/statusCode.js";
import vendorModel from "../model/vendorModel.js";
import asyncErr from "../utils/asyncErr.js";
import ErrorHandler from "../utils/errorHandler.js";

// CREATE VENDOR || POST
export const createVendor = asyncErr(async (req, res, next) => {
  // de-structuring the request
  const { company, phone, bankInfo } = req.body;
  // add user id from request
  const userID = req.user.id;

  // user is vendor already
  const existingVendor = await vendorModel.findOne({ userID });
  // if exists
  if (existingVendor)
    throw new ErrorHandler("user is already a vendor", statusCode.BADREQUEST);

  // add vendor to database
  const addVendor = await new vendorModel({
    company,
    phone,
    bankInfo,
    userID,
  }).save();

  // response on creating vendor account
  return res.status(statusCode.CREATED).json({
    success: true,
    message: "successfully created vendor account",
    vendor: addVendor,
  });
});
// UPDATE VENDOR || PUT
