import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  qty: Number
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema]
});

export default mongoose.model("Cart", cartSchema);
