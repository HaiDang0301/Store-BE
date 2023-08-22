const express = require("express");
const ProductController = require("../app/controllers/ProductsController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();
router.get("/", ProductController.productsHome);
router.get("/products/:category/:page/:sort?", ProductController.showcatalog);
router.get("/catalog/product/:slug", ProductController.showProductDetail);
router.get(
  "/admin/products/stock",
  AuthMiddleware.verifyTokenAdmin,
  ProductController.showProductStock
);
router.post(
  "/admin/product/store",
  AuthMiddleware.verifyTokenAdmin,
  ProductController.store
);
router.get(
  "/admin/product/:id/edit",
  AuthMiddleware.verifyTokenAdmin,
  ProductController.edit
);
router.put(
  "/admin/product/:id/update",
  AuthMiddleware.verifyTokenAdmin,
  ProductController.update
);
router.delete(
  "/admin/product/:id/delete",
  AuthMiddleware.verifyTokenAdmin,
  ProductController.delete
);
module.exports = router;
