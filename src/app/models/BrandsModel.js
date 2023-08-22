const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Brand = new Schema(
  {
    brand: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Brand", Brand);
