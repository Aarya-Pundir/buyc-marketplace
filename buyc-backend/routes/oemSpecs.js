const express = require("express");
const router = express.Router();
const OemSpec = require("../models/OemSpec");

// Get all OEM specs or search by manufacturer/model/year
router.get("/", async (req, res) => {
  try {
    const filters = {};
    if(req.query.manufacturer) filters.manufacturer = req.query.manufacturer;
    if(req.query.model_name) filters.model_name = req.query.model_name;
    if(req.query.year) filters.year = Number(req.query.year);

    const specs = await OemSpec.find(filters);
    res.json(specs);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
