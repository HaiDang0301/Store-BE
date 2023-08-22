const express = require("express");
const BrandsController = require("../app/controllers/BrandsController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();
router.get("/admin/brands/brand", BrandsController.showbrand);
router.get("/admin/brand/category", BrandsController.showcategory);
router.post(
  "/admin/brands/store",
  AuthMiddleware.verifyTokenAdmin,
  BrandsController.store
);
module.exports = router;
