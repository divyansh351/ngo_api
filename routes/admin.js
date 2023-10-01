const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Admin = require('../controllers/admin')
const router = express.Router();


const verifyAdmin = (req, res) => {
    if (req.body.admin_key == process.env.ADMIN_KEY) {
        req.session.tag = 1;
        res.status(200).send("Success Login")
    }
    else {
        req.session.tag = 0;
    }
}
const isAdminLoggedIn = (req, res, next) => {
    if (req.session.tag == 1) {
        next()
    }
    else {
        res.status(401).send("You are not an Admin")
    }
}

router.route('/')
    .get(isAdminLoggedIn, catchAsync(Admin.show))


router.route('/login')
    .post(verifyAdmin)

module.exports = router
