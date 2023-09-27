const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Product = require('../controllers/product')

const router = express.Router();

// return products array

router.route('/')
    .get(catchAsync(Product.show))
    .post(Product.donateProduct);



module.exports = router