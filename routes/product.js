const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Product = require('../controllers/product')
const multer = require('multer')
const { storage } = require('../cloudinary')
const { isAgentLoggedIn } = require('../middleware')
const upload = multer({ storage })

const router = express.Router();


router.route('/')
    .get(catchAsync(Product.showProducts))
    .post(upload.array('product_pictures_before'), Product.donateProduct)
router.route('/:id')
    .get(Product.viewProduct)
router.route('/assign_agent')
    .post(isAgentLoggedIn, Product.assignAgent)
router.route('/collect')
    .post(isAgentLoggedIn, Product.collectProduct)
router.route('/repair')
    .post(isAgentLoggedIn, Product.repairProduct)

module.exports = router