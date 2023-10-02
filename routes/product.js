const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Product = require('../controllers/product')
const multer = require('multer')
const { storage } = require('../cloudinary')
const { isAgentLoggedIn } = require('../middleware')
const upload = multer({ storage })

const router = express.Router();


router.route('/')
    .get(catchAsync(Product.show))
    .post(upload.array('before_pics'), Product.donateProduct)

router.route('/assign_agent')
    .post(isAgentLoggedIn, Product.assignAgent)

router.route('/collect')
    .post(isAgentLoggedIn, Product.collectProduct)

router.route('/view')
    .post(Product.viewProduct)

router.route('/repair')
    .post(isAgentLoggedIn, Product.repairProduct)

module.exports = router