const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password_hash: String,
  role: { type: String, enum: ["dealer","buyer","admin"], default: "dealer" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
