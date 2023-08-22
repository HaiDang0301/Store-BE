const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    last_time_login: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
