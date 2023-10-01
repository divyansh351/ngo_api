const express = require('express');
const Donor = require('../controllers/donor')
const router = express.Router();
const { isDonorLoggedIn } = require('../middleware')

router.route('/register')
    .post(Donor.registerDonor)
router.route('/verify')
    .post(Donor.verifyDonor)
router.route('/view')
    .get(isDonorLoggedIn, Donor.viewProfile)

module.exports = router