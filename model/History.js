const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  name: { type: String, required: true },
  locationName: { type: String, required: true },
  status: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  personName: { type: String, required: true },
  amount: { type: Number, required: true },
  feedBack: { type: String, required: true },
});

mongoose.model("History", historySchema);
