import JWT from "jsonwebtoken";
import asyncErr from "../utils/asyncErr.js";
import vendorModel from "../model/vendorModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import statusCode from "../config/statusCode.js";

// verify accessToken
export const verifyaccessToken = asyncErr(async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const decode = await JWT.verify(accessToken, process.env.JWT_ACCESS_SECRET);
  req.user = decode;
  next();
});

// check vendor and add vendor id
export const isVendor = asyncErr(async (req, res, next) => {
  const vendor = await vendorModel.findOne({ userID: req.user.id });
  // if there is no vendor
  if (!vendor)
    throw new ErrorHandler(
      "no vendor account is associated with the user",
      statusCode.BADREQUEST
    );
  // setting vendor ID
  req.vendor = { id: vendor.id };
  next();
});
