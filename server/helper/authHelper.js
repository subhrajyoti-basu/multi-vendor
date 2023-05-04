import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// hash password given by user
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw "error in hashing password";
  }
};

// compare hashed password
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw "error in checking password";
  }
};

// generate accessToken
export const generateAccessToken = async (payload) => {
  try {
    return await JWT.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    throw "error in generating access token";
  }
};
