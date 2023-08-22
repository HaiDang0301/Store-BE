const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = Schema({
  id: { type: String },
  fullname: { type: String },
  phonenumber: { type: String },
  city: { type: String },
  districts: { type: String },
  ward: { type: String },
  address: { type: String },
  cart: [],
  totalprice: { type: String },
  status: { type: String, default: "Đang xử lý" },
  date: { type: Date },
});
module.exports = mongoose.model("Order", Order);
