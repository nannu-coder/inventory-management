const Product = require("../models/product.model");

exports.getProducts = async (req, res, next) => {
  try {
    const filters = { ...req.query };
    const excludeFields = ["sort", "limit", "page"];

    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries["sortBy"] = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries["skip"] = skip;
      queries["limit"] = parseInt(limit);
    }

    // console.log("queries", queries);
    const result = await Product.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .sort(queries.sortBy)
      .select(queries.fields);

    const total = await Product.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);

    res.status(200).json({
      status: "success",
      msg: "successfuly get data",
      data: { total, page, result },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};

exports.createProducts = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    msg: "successfully created",
    data: product,
  });
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.updateOne({ _id: id }, { $set: req.body });
    res.status(200).json({
      status: "success",
      data: result,
      msg: "Data successfulyy upadated",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({ _id: id });
    res.status(200).json({
      status: "Success",
      msg: "successfully Delete the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};

exports.bulkProductDelete = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const result = await Product.deleteMany();
    res.status(200).json({
      status: "successfully deleted",
      msg: "successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};
