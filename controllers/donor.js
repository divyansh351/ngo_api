const Donor = require('../models/donor')

module.exports.registerDonor = async (req, res) => {
    const {
        donor_name,
        donor_mob_number,
        donor_address,
        donor_email,
        donor_id_type,
        donor_id_number,
        donor_pan_number,
        donor_anonymous
    } = req.body;
    const donor = new Donor({
        donor_name: donor_name,
        donor_mob_number: donor_mob_number,
        donor_address: donor_address,
        donor_email: donor_email,
        donor_id_type: donor_id_type,
        donor_id_number: donor_id_number,
        donor_pan_number: donor_pan_number,
        donor_anonymous: donor_anonymous
    })
    await donor.save();
    res.send("Donor Successfully Registered")
}

module.exports.viewProfile = async (req, res) => {
    const {
        donor_mob_number,
        donor_email
    } = req.body;
    const donor = await Donor.findOne({ donor_email: donor_email })
    if (donor_mob_number === donor.donor_mob_number)
        res.send(donor);
    else
        res.send("Combination of mobile and email given is incorrect");
}

module.exports.verifyDonor = async (req, res) => {
    const { donor_email, donor_mob_number } = req.body;
    const donor = await Donor.findOne({ donor_email })
    if (donor.donor_mob_number == donor_mob_number) {
        req.session.current_donor_id = donor._id;
        res.status(200).send("Verification Success")
    }
    else {
        res.status(401).send("Email id and phone number does not match")
    }
}