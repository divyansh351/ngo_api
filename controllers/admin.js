const Admin = require('../models/admin')

module.exports.show = async (req, res) => {
    const admin = await Admin.find({})
    res.json({ admin })
}

module.exports.verifyAdmin = (req, res) => {
    if (req.body.admin_key == process.env.ADMIN_KEY) {
        req.session.tag = 1;
        res.status(200).send("Admin Successfully Verified")
    }
    else {
        req.session.tag = 0;
    }
}
