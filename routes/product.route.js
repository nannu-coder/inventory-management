const router = require("express").Router();
const {
  createProducts,
  getProducts,
  updateProduct,
  deleteProduct,
  bulkProductDelete,
} = require("../controllers/product.controller");

router.delete("/bulk-delete", bulkProductDelete);
router.post("/", createProducts);
router.get("/", getProducts);

router.route("/:id").patch(updateProduct).delete(deleteProduct);

// router.patch("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

module.exports = router;
