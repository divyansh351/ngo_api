const Admin = require('../models/admin')
const jwt = require("jsonwebtoken");

module.exports.show = async (req, res) => {
    try {
        jwt.verify(req.token, process.env.JWT_KEY, (err, authorizedData) => {
            if (err) {
                console.log("ERROR: Could not connect to the protected route");
                res.sendStatus(403);
            } else {
                if (authorizedData.hasOwnProperty("admin")) {
                    res.send(authorizedData);
                } else {
                    res.send("Unauthorized access to donor's profile");
                }
            }
        });
    } catch (e) {
        res.send(e);
    }
}

module.exports.verifyAdmin = (req, res) => {
    const admin = {
        admin_name: "Admin"
    }
    try {
        if (req.body.admin_key == process.env.ADMIN_KEY) {
            req.session.tag = 1;
            jwt.sign(
                { admin },
                process.env.JWT_KEY,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) {
                        console.log(err);
                    }
                    res.json({
                        message: "Admin Verification Successful",
                        token: token,
                        role: "admin",
                    });
                }
            );
        }
        else {
            req.session.tag = 0;
        }
    } catch (e) {
        res.send(e);
    }
}
