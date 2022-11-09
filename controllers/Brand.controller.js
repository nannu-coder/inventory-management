const Brand = require("../models/Brand.model");

exports.createBrand = async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getBrand = async (req, res, next) => {
  try {
    const result = await Brand.find({});
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Brand.findOne(
      { _id: id },
      {
        runvalidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Brand.updateOne({ _id: id }, req.body);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
