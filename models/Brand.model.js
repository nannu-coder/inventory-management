const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const brandSchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    name: {
      type: String,
      required: [true, "Please provide a brand name"],
      trim: true,
      lowercase: true,
      maxLength: 100,
      unique: true,
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    website: {
      type: String,
      lowercase: true,
      validate: [validator.isURL, "Please enter a valid URL"],
    },
    location: String,
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Brand = new mongoose.model("Brand", brandSchema);

module.exports = Brand;
