const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");

const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
  try {
    const { username, password, role, email } = req.body;
    console.log("email password", username, password);
    const user = new User({
      username,
      password,
      role,
      email,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtKey);
    res.status(200).send({ msg: "created user successfully", token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("username and password");
    return res.status(422).send({ error: "invalid username or password" });
  }
  const user = await User.findOne({ username });
  console.log("user", user);
  if (!user) {
    return res.status(422).send({ error: "invalid username or password" });
  }
  if (user.password === password) {
    const token = jwt.sign({ userId: user._id }, jwtKey);
    return res.send({ msg: "user successfully logged in", token });
  }
  return res.status(422).send({ error: "invalid username or password" });
});

module.exports = router;
