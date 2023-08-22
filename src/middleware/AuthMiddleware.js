const jwt = require("jsonwebtoken");
class authToken {
  verifyTokenUser(req, res, next) {
    const authHeader = req.headers.token;
    const token = authHeader;
    if (!token) {
      return res.send("k co token");
    } else {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          res.send("Token sai");
        } else {
          if (user.admin === false || user.admin === true) {
            next();
          }
        }
      });
    }
  }
  verifyTokenAdmin(req, res, next) {
    const authHeader = req.headers.token;
    const token = authHeader;
    if (!token) {
      return res.send("k co token");
    } else {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, body) => {
        if (err) {
          res.send("Token sai");
        } else {
          if (body.admin === true) {
            next();
          } else {
            res.json("Bạn không có quyền truy cập");
          }
        }
      });
    }
  }
}
module.exports = new authToken();
