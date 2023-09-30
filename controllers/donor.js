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
    // console.log(req.body)
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
    res.send("registerDonor works fine")
}

module.exports.viewProfile = async (req, res) => {
    const {
        donor_mob_number,
        donor_email
    } = req.body;
    const donor = await Donor.findOne({ donor_email: donor_email })
    if (donor_mob_number === donor.donor_mob_number)
        res.send("registerDonor works fine");
    else
        res.send("incorrect mobile number email");
}