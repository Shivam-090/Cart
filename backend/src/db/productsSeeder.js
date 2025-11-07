import mongoose from "mongoose";
import Product from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });



const products = [
  { name: "Vibe T-Shirt", price: 499 },
  { name: "Vibe Hoodie", price: 1199},
  { name: "Vibe Sneakers", price: 2999 },
  { name: "Vibe Sunglasses", price: 899 },
  { name: "Vibe Cap", price: 399 },
  { name: "Vibe Wallet", price: 799 }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log("Products Added");
  process.exit();
});
