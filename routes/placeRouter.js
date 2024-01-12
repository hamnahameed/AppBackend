const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Place = mongoose.model("Place");

const requireToken = require("../middleware/token");

router.post("/place", requireToken, async (req, res) => {
  try {
    const { name, latitude, longitude, nearestMechanic } = req.body;
    const place = new Place({
      name,
      longitude,
      latitude,
      nearestMechanic,
    });
    await place.save();
    res.status(200).send({ msg: "location posted successfully" });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.get("/place", requireToken, async (req, res) => {
  try {
    Place.find({}).then((places) => {
      res.status(200).send({ places });
    });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
