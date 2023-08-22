const ProductsRouter = require("./products");
const BrandsRouter = require("./brands");
const AuthRouter = require("./auth");
const OrderRouter = require("./orders");
function route(app) {
  app.use("/", ProductsRouter);
  app.use("/", BrandsRouter);
  app.use("/", AuthRouter);
  app.use("/", OrderRouter);
}
module.exports = route;
