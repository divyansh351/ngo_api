const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Agent = require('../controllers/agent')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const router = express.Router();

router.route('/register')
    .post(upload.single('agent_photo'), Agent.registerAgent)
// router.route('/view')
//     .post(Agent.viewProfile)

module.exports = router