const Admin = require('../models/admin')

module.exports.show = async (req, res) => {
    try {
        const admin = await Admin.find({});
        res.json({ admin });
    } catch (e) {
        res.send(e);
    }
}

module.exports.verifyAdmin = (req, res) => {
    try {
        if (req.body.admin_key == process.env.ADMIN_KEY) {
            req.session.tag = 1;
            res.status(200).send("Admin Successfully Verified");
        }
        else {
            req.session.tag = 0;
        }
    } catch (e) {
        res.send(e);
    }
}
