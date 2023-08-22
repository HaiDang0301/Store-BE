const Orders = require("../models/OderModel");
const Products = require("../models/ProductsModel");
class OrdersController {
  async show(req, res, next) {
    const param = req.params.id;
    const orders = await Orders.find({ id: param });
    res.json(orders);
  }
  async showorder(req, res, next) {
    const limit = 8;
    const Paramspage = req.params.page;
    if (Paramspage) {
      var page = Paramspage.slice(5);
    }
    if (!Paramspage) {
      page = 1;
    }
    const search = await req.query.search;
    let teteria = {};
    if (search) {
      teteria = { phonenumber: search };
    }
    const count = await Orders.find(teteria).countDocuments();
    const pagecount = Math.ceil(count / limit);
    try {
      const order = await Orders.find(teteria)
        .skip((page - 1) * limit)
        .limit(limit);
      return res.json({ order, pagecount });
    } catch (error) {
      return res.send("Không Thể Kết Nối Đến Server");
    }
  }
  async showdetail(req, res, next) {
    const params = req.params.id;
    try {
      const cart = await Orders.findById({ _id: params });
      res.json(cart);
    } catch (error) {
      res.send("Không thể kết nối đến server");
    }
  }
  async store(req, res, next) {
    const id = req.params.id;
    const order = new Orders({
      id: id,
      fullname: req.body.name,
      phonenumber: req.body.telephone,
      city: req.body.city,
      districts: req.body.districts,
      ward: req.body.ward,
      address: req.body.address,
      cart: req.body.cart,
      totalprice: req.body.total,
      date: Date.now(),
    });
    await order.save();
    res.json("Đặt Hàng Thành Công");
    await order.cart.map(async (i) => {
      let numberOrder = parseInt(i.quantity);
      let name = i.name;
      const quantity = await Products.find({ name: name });
      quantity.map(async (i) => {
        let newQuantity = parseInt(i.number) - numberOrder;
        await Products.find({ name: name }).updateOne({
          number: newQuantity,
        });
        await Products.find({ number: { $lt: 50 } }).updateOne({
          status: "Sắp hết hàng",
        });
      });
    });
  }
  async update(req, res, next) {
    const order = await Orders.findByIdAndUpdate(
      { _id: req.body.id },
      {
        status: req.body.status,
      }
    );
    try {
      res.json(order);
    } catch (error) {
      res.send("Không thể kết nối đến server");
    }
  }
  async delete(req, res, next) {
    const id = await Orders.findById({ _id: req.body.id });
    if (id) {
      await Orders.findByIdAndDelete({
        _id: req.body.id,
      });
      return res.send("Xóa Thành Công");
    } else {
      return res.send("Không tìm thấy đơn hàng");
    }
  }
}
module.exports = new OrdersController();
