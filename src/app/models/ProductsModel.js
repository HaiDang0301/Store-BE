const mongoose = require("mongoose");
const Schema = mongoose.Schema;
slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Product = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, slug: "name" },
    number: { type: Number, required: true },
    status: { type: String, default: "Còn Hàng" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", Product);
