const User = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
process.env.TOKEN_SECRET;
class UserController {
  async show(req, res, next) {
    const user = await User.find({});
    res.json(user);
  }
  async register(req, res, next) {
    try {
      const email = await User.findOne({ email: req.body.email });
      {
        if (email) {
          return res.send("Tài Khoản Đã Tồn Tại");
        }
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashed,
      });
      await user.save();
      res.status(200).json("Đăng Ký Thành Công");
    } catch (error) {
      res.status(500).send("Không thể kết nối đến server");
    }
  }
  async login(req, res, next) {
    try {
      const email = await User.findOne({ email: req.body.email });
      if (!email) {
        return res
          .status(203)
          .json({ message: "Thông Tin Tài Khoản Mật Khẩu Không Chính Xác" });
      }
      const password = await bcrypt.compare(req.body.password, email.password);
      if (!password) {
        return res
          .status(203)
          .json({ message: "Thông Tin Tài Khoản Mật Khẩu Không Chính Xác" });
      }
      if (email && password) {
        const token = await jwt.sign(
          {
            id: email._id,
            admin: email.admin,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "15d" }
        );
        const { password, ...others } = email._doc;
        const last_time_login = await User.updateOne(
          { email: req.body.email },
          { last_time_login: Date.now() }
        );
        return res.json({ others, token });
      }
    } catch (error) {
      res.status(500).send("Không thể kết nối đến server");
    }
  }
  async cart(req, res, next) {
    const cart = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { cart: req.body }
    );
    res.json(cart);
  }
}
module.exports = new UserController();
