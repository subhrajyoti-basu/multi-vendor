import { Router } from "express";
import { getOrders, placeOrder } from "../controllers/orderController.js";
import { isVendor, verifyaccessToken } from "../middleware/authMiddleware.js";

// create initialize router
const orderRouter = Router();

// routes
// ORDERS || GET ->
orderRouter.get("/get-orders", verifyaccessToken, getOrders);
// PLACE ORDER || ADD ORDER || POST -> CUSTOMER
orderRouter.post("/create-order", verifyaccessToken, placeOrder);

// export router
export default orderRouter;
