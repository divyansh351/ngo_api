const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Agent = require('../controllers/agent')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const passport = require('passport');
const { isAgentLoggedIn, storeReturnTo } = require('../middleware')

const router = express.Router();

router.route('/register')
    .post(upload.single('agent_photo'), catchAsync(Agent.registerAgent))

router.route('/login')
    .post(storeReturnTo,
        passport.authenticate('local', { failureRedirect: '/agent/failure', failureMessage: true }),
        Agent.loginAgent)

router.route('/view')
    .get(isAgentLoggedIn, Agent.viewAgent)

router.route('/failure')
    .get((req, res) => res.status(401).send(req.session.messages))

module.exports = router