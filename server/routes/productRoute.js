import { Router } from "express";
import {
  addProduct,
  getProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import { isVendor, verifyaccessToken } from "../middleware/authMiddleware.js";

// initialize router
const productRouter = Router();

// ADD PRODUCT || POST
productRouter.post("/add-product", verifyaccessToken, isVendor, addProduct);
// UPDATE PRODUCT || PUT
// DELETE PRODUCT || DELETE
// GET PRODUCT || GET
productRouter.get("/get-single-product/:id", getSingleProduct);
// GET PRODUCTS || GET (MULTIPLE)

productRouter.get("/get-products", getProducts);

export default productRouter;
