const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  nearestMechanic: [
    {
      name: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      phoneNumber: { type: String, required: true },
      locationName: { type: String, required: true },
    },
  ],
});

mongoose.model("Place", placeSchema);
