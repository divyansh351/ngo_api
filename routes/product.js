const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Product = require("../controllers/product");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

const router = express.Router();

router
  .route("/")
  .get(catchAsync(Product.showProducts))
  .post(upload.array("image", 10), Product.donateProduct);
router.route("/:id").get(Product.viewProduct);
router.route("/assign_agent").post(Product.assignAgent);
router.route("/collect").post(Product.collectProduct);
router.route("/repair")
  .post(upload.array("image", 10), Product.repairProduct);
router.route("/receive").post(Product.receiveProduct);

module.exports = router;
