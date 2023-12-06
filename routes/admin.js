const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Admin = require('../controllers/admin')
const router = express.Router();
const { checkToken } = require("../middleware");


router.route('/view')
    .get(checkToken, catchAsync(Admin.show))

router.route('/login')
    .post(Admin.verifyAdmin)

module.exports = router
