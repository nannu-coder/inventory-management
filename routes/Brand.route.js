const router = require("express").Router();
const {
  createBrand,
  getBrand,
  getBrandById,
  updateBrand,
} = require("../controllers/Brand.controller");

router.route("/").post(createBrand).get(getBrand);
router.route("/:id").patch(updateBrand).get(getBrandById);

module.exports = router;
