const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Product = require('../controllers/product')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const router = express.Router();

router.route('/')
    .get(catchAsync(Product.show))
    .post(upload.array('before_pics'), Product.donateProduct);

router.route('/assign_agent')
    .post(Product.assignAgent)

module.exports = router