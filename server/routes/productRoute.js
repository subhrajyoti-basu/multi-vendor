import { Router } from "express";
import { addProduct } from "../controllers/productController.js";
import { isVendor, verifyaccessToken } from "../middleware/authMiddleware.js";

// initialize router
const productRouter = Router();

// ADD PRODUCT || POST
productRouter.post("/add-product", verifyaccessToken, isVendor, addProduct);
// UPDATE PRODUCT || PUT
// DELETE PRODUCT || DELETE
// GET PRODUCT || GET
// GET PRODUCTS || GET (MULTIPLE)

export default productRouter;
