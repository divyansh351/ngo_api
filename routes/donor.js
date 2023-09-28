const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Donor = require('../controllers/donor')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const router = express.Router();

router.route('/register')
    .post(Donor.registerDonor)
router.route('/view')
    .post(Donor.viewProfile)

module.exports = router