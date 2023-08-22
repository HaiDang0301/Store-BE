const Product = require("../models/ProductsModel.js");
const cloadinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
cloadinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
class ProductController {
  async productsHome(req, res, next) {
    const product = await Product.find({});
    res.json(product);
  }
  async showcatalog(req, res, next) {
    var category = await req.params.category;
    const limit = 8;
    var query = await req.query.search;
    let count = await Product.countDocuments();
    let criteria = {};
    //find
    if (category === "catalog") {
      criteria = {};
      count = await Product.countDocuments();
    } else {
      criteria = { category: category.split("-").join(" ") };
      count = await Product.find({
        category: category.split("-").join(" "),
      }).countDocuments();
    }
    //query params
    if (category === "catalog" && query) {
      criteria = { name: { $regex: query.split("+").join(" ") } };
      count = await Product.find(criteria).countDocuments();
    }
    if (category !== "catalog" && query) {
      criteria = {
        category: category.split("-").join(" "),
        name: { $regex: query.split("+").join(" ") },
      };
      count = await Product.find(criteria).countDocuments();
    }
    //sort
    const sort = req.params.sort;
    let Sort = {};
    if (sort === "Default") {
      Sort = {};
    }
    if (sort === "New") {
      Sort = { updatedAt: -1 };
    }
    if (sort === "Reduce") {
      Sort = { price: -1 };
    }
    if (sort === "Increase") {
      Sort = { price: 1 };
    }
    // //Panigate
    const totalPage = Math.ceil(count / limit);
    const paramPage = await req.params.page;
    if (paramPage) {
      var page = paramPage.slice(5);
    } else {
      page = 1;
    }
    if (page > totalPage || page <= 0) {
      return res.send("No Products");
    }
    //query find
    try {
      const products = await Product.find(criteria)
        .sort(Sort)
        .skip((page - 1) * limit)
        .limit(limit);
      res.json({ products, totalPage });
    } catch (error) {
      res.send("err");
    }
  }
  async showProductStock(req, res, next) {
    const products = await Product.find({ number: { $lt: 20 } });
    const count = await Product.find({ number: { $lt: 20 } }).countDocuments();
    return res.json({ products, count });
  }
  async showProductDetail(req, res, next) {
    try {
      const product = await Product.findOne({ slug: req.params.slug });
      res.json(product);
    } catch (error) {
      res.send("Connect Sever False");
    }
  }
  async store(req, res, next) {
    try {
      const name = await Product.findOne({ name: req.body.name });
      {
        if (name) {
          return res.send("Sản Phẩm Đã Tồn Tại");
        } else {
          const fileUpload = req.files.image;
          const result = await cloadinary.uploader.upload(
            fileUpload.tempFilePath
          );
          const newProducts = new Product({
            name: req.body.name,
            image: result.url,
            brand: req.body.brand,
            category: req.body.category,
            number: req.body.number,
            price: req.body.price,
            description: req.body.description,
          });
          await newProducts.save();
          res.send("Add successful product");
        }
      }
    } catch (error) {
      res.send("Connect Server False");
    }
  }
  async edit(req, res, next) {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      res.json(product);
    } catch (error) {
      res.send("Product NotFound");
    }
  }
  async update(req, res, next) {
    try {
      const productID = await Product.findById({ _id: req.params.id });
      await productID.updateOne({
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        number: req.body.number,
        price: req.body.price,
        description: req.body.description,
      });
      res.status(200).send("Update Thành Công");
      await Product.find({ number: { $gt: 20 } }).updateOne({
        status: "Còn Hàng",
      });
    } catch (error) {
      res.send("Connect Server False");
    }
  }
  async delete(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete({ _id: req.params.id });
      res.status(200).send("Xóa Thành Công");
    } catch (error) {}
  }
}
module.exports = new ProductController();
