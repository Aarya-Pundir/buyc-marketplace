const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  dealer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  oem_spec_id: { type: mongoose.Schema.Types.ObjectId, ref: "OemSpec" },
  kms_on_odometer: Number,
  major_scratches: Boolean,
  original_paint: Boolean,
  num_accidents: Number,
  num_previous_buyers: Number,
  registration_place: String,
  price: Number,
  color: String,
  mileage_actual: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MarketplaceInventory", inventorySchema);
