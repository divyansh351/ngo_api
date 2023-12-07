const Donor = require("../models/donor");
const jwt = require("jsonwebtoken");

module.exports.registerDonor = async (req, res) => {
  try {
    const {
      donor_name,
      donor_mob_number,
      donor_address,
      donor_email,
      donor_id_type,
      donor_id_number,
      donor_pan_number,
      donor_anonymous,
    } = req.body;
    const donor = new Donor({
      donor_name: donor_name,
      donor_mob_number: donor_mob_number,
      donor_address: donor_address,
      donor_email: donor_email,
      donor_id_type: donor_id_type,
      donor_id_number: donor_id_number,
      donor_pan_number: donor_pan_number,
      donor_anonymous: donor_anonymous,
    });
    await donor.save();
    jwt.sign(
      { donor },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          res.status(403).json({
            message: "protected Route"
          });
        }
        res.status(201).json({
          message: "Registration Successful",
          token: token,
          role: "donor",
        });
      }
    );
  } catch (e) {
    res.status(500).json({ name: e.name, message: e.message });
  }
};

module.exports.viewProfile = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authorizedData) => {
      if (err) {
        res.status(403).json({
          message: "protected Route"
        });
      } else {
        if (authorizedData.hasOwnProperty("donor") || authorizedData.hasOwnProperty("admin")) {
          res.status(200).send(authorizedData);
        } else {
          res.status(401).json({ message: "Unauthorized access to agent's profile" });
        }
      }
    });
  } catch (e) {
    res.status(401).json({ name: e.name, message: e.message });
  }
};

module.exports.verifyDonor = async (req, res) => {
  try {
    const { donor_email, donor_mob_number } = req.body;
    const donor = await Donor.findOne({ donor_email });
    if (donor.donor_mob_number == donor_mob_number) {
      req.session.current_donor_id = donor._id;
      jwt.sign(
        { donor },
        process.env.JWT_KEY,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            res.status(403).json({
              message: "protected Route"
            });
          }
          res.status(201).json({
            message: "Verification Successful",
            token: token,
            role: "donor",
          });
        }
      );
    } else {
      res.status(401).json({ message: "Email id and phone number does not match" });
    }
  } catch (e) {
    res.status(401).json({ name: e.name, message: e.message });
  }
};
module.exports.getTopDonor = async (req, res) => {
  try {
    const donor = await Donor.find({});
    donor.sort((a, b) => {
      return b.donor_products.length - a.donor_products.length;
    });
    res.status(200).json(donor);
  } catch (e) {
    res.status(401).json({ name: e.name, message: e.message });
  }
};
