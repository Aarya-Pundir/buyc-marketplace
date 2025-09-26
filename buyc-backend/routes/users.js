
const express = require("express");
const router = express.Router();
const User = require("/models/User");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body); 
    const saved = await user.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
