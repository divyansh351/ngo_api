const Admin = require('../models/admin')

module.exports.show = async (req, res) => {
    const admin = await Admin.find({})
    res.json({ admin })
}
