const express = require('express');
const Product = require('../schemas/product')
const catchAsync = require('../utils/catchAsync')

const router = express.Router();

// return products array
router.get('/', catchAsync(async (req, res) => {
    const products = await Product.find({})
    res.json(products);
}))



module.exports = router