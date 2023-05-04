import { Router } from "express";
import { createVendor } from "../controllers/vendorController.js";
import { verifyaccessToken } from "../middleware/authMiddleware.js";

const vendorRouter = Router();

// CREATE VENDOR || POST
vendorRouter.post("/create-vendor", verifyaccessToken, createVendor);

export default vendorRouter;
