const Brands = require("../models/BrandsModel.js");
class BrandsController {
  async showbrand(req, res, next) {
    const brands = await Brands.find().distinct("brand");
    res.json(brands);
  }
  async showcategory(req, res, next) {
    const categories = await Brands.find().distinct("category");
    res.json(categories);
  }
  async store(req, res, next) {
    try {
      const brands = new Brands({
        brand: req.body.brand,
        category: req.body.category,
      });
      await brands.save();
      console.log(brands);
      res.send("Thêm Thành Công");
    } catch (error) {}
  }
}
module.exports = new BrandsController();
