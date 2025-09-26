const express = require("express");
const router = express.Router();
const Inventory = require("../models/MarketplaceInventory");

// Get all inventory (with optional filters)
router.get("/", async (req, res) => {
  try {
    const filters = {};
    if(req.query.color) filters.color = req.query.color;
    if(req.query.minPrice) filters.price = { $gte: Number(req.query.minPrice) };
    if(req.query.maxPrice) filters.price = { ...filters.price, $lte: Number(req.query.maxPrice) };
    if(req.query.maxMileage) filters.mileage_actual = { $lte: Number(req.query.maxMileage) };

    const inventory = await Inventory.find(filters).populate("dealer_id oem_spec_id");
    res.json(inventory);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new inventory
router.post("/", async (req, res) => {
  try {
    const newCar = new Inventory(req.body);
    const saved = await newCar.save();
    res.json(saved);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit inventory
router.put("/:id", async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete inventory
router.delete("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
