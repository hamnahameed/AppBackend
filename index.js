const express = require("express");
const app = express();
const PORT = 3000;
const { json } = require("body-parser");
const { mongoUrl } = require("./config");
const mongoose = require("mongoose");
require("./model/User");
require("./model/Places");
require("./model/History");
const authRoutes = require("./routes/authRouter");
const placeRoutes = require("./routes/placeRouter");
const historyRoutes = require("./routes/historyRouter");
const requireToken = require("./middleware/token");

app.use(json());
app.use(authRoutes);
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("connected database");
});

mongoose.connection.on("error", (e) => {
  console.log("connection failed", e);
});

app.get("/", requireToken, (req, res) => {
  res.send(req.user);
});
app.use("/", placeRoutes);
app.use("/", historyRoutes);

app.listen(PORT, () => {
  console.log("server running");
});
