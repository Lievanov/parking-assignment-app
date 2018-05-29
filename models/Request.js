const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  location: String,
  status: String,
  requestorId: {
    type: String,
    required: true
  }
});

mongoose.model("requests", requestSchema);
