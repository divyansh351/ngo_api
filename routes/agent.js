const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Agent = require('../controllers/agent')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const passport = require('passport');

const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        res.status(401).send("unauthorized access")
    } else next();
}

const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

router.route('/register')
    .post(upload.single('agent_photo'), catchAsync(Agent.registerAgent))

router.route('/login')
    .post(storeReturnTo, passport.authenticate('local', { failureRedirect: '/agent/failure', failureMessage: true }), (req, res) => { res.send("success") })

router.route('/view')
    .get(isLoggedIn, Agent.viewAgent)

router.route('/failure')
    .get((req, res) => {
        res.status(401).send(req.session.messages)
    })

module.exports = router