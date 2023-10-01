const express = require('express');
const catchAsync = require('../utils/catchAsync')
const Donor = require('../controllers/donor')
const Donors = require('../models/donor')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const router = express.Router();

const verifyDonor = async(req,res)=>{
    const {donor_email,donor_mob_number}=req.body;
    const donor = await Donors.findOne({donor_email})
    if(donor.donor_mob_number==donor_mob_number){
        req.session.current_donor_id=donor._id;
        res.status(200).send("Verification Success")
    }
    else {
        res.status(401).send("Email id and phone number does not match")
    }
}

const isDonorLoggedIn = (req,res,next)=>{
    if(req.session.current_donor_id) {
        next()
    }
    else {
        res.status(401).send("You are not logged in")
    }
}

router.route('/register')
    .post(Donor.registerDonor)
router.route('/verify')
    .post(verifyDonor)
router.route('/view')
    .get(isDonorLoggedIn, Donor.viewProfile)


module.exports = router