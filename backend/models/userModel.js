const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  dob:{
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  lastPaymentDate: {
    type: Date,
    default: new Date('1971-01-01'),
  },
  batchSelected: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Users", userSchema);
