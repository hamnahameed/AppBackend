const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const History = mongoose.model("History");

const requireToken = require("../middleware/token");

router.post("/history", requireToken, async (req, res) => {
  try {
    const {
      name,
      locationName,
      status,
      phoneNumber,
      amount,
      personName,
      feedBack,
    } = req.body;
    const history = new History({
      name,
      locationName,
      status,
      amount,
      phoneNumber,
      amount,
      personName,
      feedBack,
    });
    await history.save();
    res.status(200).send({ msg: "history posted successfully" });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.get("/history", requireToken, async (req, res) => {
  try {
    History.find({}).then((history) => {
      res.status(200).send({ history });
    });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
