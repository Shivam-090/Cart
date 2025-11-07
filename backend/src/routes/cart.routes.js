import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();


router.get("/", async (req, res) => {
  let cart = await Cart.findOne().populate("items.productId");

  if (!cart) {
    cart = await Cart.create({ items: [] });
  }

  const total = cart.items.reduce((sum, item) => sum + (item.productId.price * item.qty), 0);

  res.json({ items: cart.items, total });
});


router.post("/", async (req, res) => {
  const { productId, qty } = req.body;

  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });

  const existingItem = cart.items.find(i => i.productId.toString() === productId);

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.items.push({ productId, qty });
  }

  await cart.save();

  res.json(cart);
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  let cart = await Cart.findOne();

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.productId.toString() !== id);

  await cart.save();

  res.json(cart);
});

router.post("/checkout", async (req, res) => {
  const timestamp = new Date();
  const total = req.body.cartItems.reduce((sum, item) => sum + (item.productId.price * item.qty), 0);

  res.json({
    success: true,
    total,
    timestamp
  });
});

export default router;
