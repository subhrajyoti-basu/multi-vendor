import orderModel from "../model/orderModel.js";

class GetOrderQuery {
  // order goes to vendor -> GET [MULTIPLE]
  newOrdersToVendor = async (vendorID) => {
    return await orderModel.find({ vendorID, state: "placed" });
  };
  // order view to customer -> GET [MULTIPLE]
  activeOrdersToCustomer = async (customerID) => {
    return await orderModel.find({ customerID, state: "placed" });
  };
}

export default GetOrderQuery;
