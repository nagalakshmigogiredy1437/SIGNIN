const mongoose = require("mongoose");
const { type } = require("os");

let Register = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Register", Register);
