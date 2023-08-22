const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/StoreChildren");
    console.log("Connect Success");
  } catch (error) {
    console.log("Connect False");
  }
}
module.exports = { connect };
