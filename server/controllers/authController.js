import statusCode from "../config/statusCode.js";
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from "../helper/authHelper.js";
import userModel from "../model/userModel.js";
import asyncErr from "../utils/asyncErr.js";
import ErrorHandler from "../utils/errorHandler.js";

// USER LOGIN || POST
export const loginController = asyncErr(async (req, res, next) => {
  // de-structure the req
  const { email, password } = req.body;

  // validate the data
  if (!email || !password)
    throw new ErrorHandler(
      "emailId or passowrd is blank",
      statusCode.BADREQUEST
    );

  // check user
  const existingUser = await userModel.findOne({ email });
  if (!existingUser)
    throw new ErrorHandler(
      "emailId or passowrd is invalid",
      statusCode.BADREQUEST
    );
  // if password don't match
  if (!(await comparePassword(password, existingUser.password)))
    throw new ErrorHandler("Passowrd is invalid", statusCode.NOTFOUND);

  // if passed every check generate accessToken
  const accessToken = await generateAccessToken({ id: existingUser._id });

  // remove password field & _id
  const user = { ...existingUser._doc, password: undefined, _id: undefined };

  // send the access token to the client
  res.status(statusCode.OK).json({
    success: true,
    message: "user logged in successfully",
    user,
    accessToken,
  });
});

// USER REGISTER || POST
export const registerController = asyncErr(async (req, res, next) => {
  // de-structure the req
  const { email, firstName, lastName, password, address } = req.body;

  // check if user with same email id exists
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser)
    throw new ErrorHandler(
      "user with emailID already exists",
      statusCode.BADREQUEST
    );

  // hashPassword before saving it to the DATABASE
  const hashedPassword = await hashPassword(password);

  // add user to database
  const registerUser = await new userModel({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    address,
  }).save();

  // remove password form response
  registerUser.password = undefined;

  // send response to client
  res.status(statusCode.CREATED).json({
    success: true,
    message: "user registration successful",
    registerUser,
  });
});
