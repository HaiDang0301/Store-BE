const express = require("express");
const OrdersController = require("../app/controllers/OrdersController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();
router.get("/:id?/orders", OrdersController.show);
router.get(
  "/orders/:page=?",
  AuthMiddleware.verifyTokenAdmin,
  OrdersController.showorder
);
router.get("/:id/orders/detail", OrdersController.showdetail);
router.put(
  "/orders/status",
  AuthMiddleware.verifyTokenAdmin,
  OrdersController.update
);
router.post("/:id/store", OrdersController.store);
router.delete(
  "/orders/delete",
  AuthMiddleware.verifyTokenAdmin,
  OrdersController.delete
);
module.exports = router;
