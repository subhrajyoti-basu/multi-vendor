import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

const authRouter = Router();

// USER LOGIN || POST
authRouter.post("/login", loginController);
// USER REGISTER || POST
authRouter.post("/register", registerController);

export default authRouter;
