const mongoose = require("mongoose");

const oemSpecSchema = new mongoose.Schema({
  manufacturer: String,
  model_name: String,
  year: Number,
  list_price: Number,
  colors: [String],
  mileage: Number,
  power_bhp: Number,
  max_speed: Number,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("OemSpec", oemSpecSchema);
