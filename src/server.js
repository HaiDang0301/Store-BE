const express = require("express");
const db = require("./config/db");
const router = require("./routes/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.http;
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());
db.connect();
app.use(express.json());
router(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
