const express = require("express");
const UserController = require("../app/controllers/AuthControler");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();
router.get("/admin/user", UserController.show);
router.post("/auth/login", UserController.login);
router.post("/auth/register", UserController.register);
module.exports = router;
