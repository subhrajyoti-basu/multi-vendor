import productModel from "../model/productModel.js";

class GetProductQuery {
  // vendor can access only vendor products (MULTIPLE)
  viewOnlyVendorProducts = async (vendorID) => {
    try {
      return await productModel.find({ vendorID: vendorID }, null, {
        sort: { createdAt: -1 },
      });
    } catch (error) {
      throw "error in viewOnlyVendorProduct Query";
    }
  };
  // public query products (MULTIPLE)
  publicProducts = async () => {
    try {
      return await productModel.find({}, null, {
        sort: { createdAt: -1 },
      });
    } catch (error) {
      throw "error in public Product Query";
    }
  };
  // public query single product (SINGLE)
  viewOnlySingleProduct = async (productID) => {
    try {
      return await productModel.findOne({ _id: productID });
    } catch (error) {
      throw "error in viewOnlyVendorProduct Query";
    }
  };

  //
}

export default GetProductQuery;
