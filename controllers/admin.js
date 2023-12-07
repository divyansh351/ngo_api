const jwt = require("jsonwebtoken");

module.exports.show = async (req, res) => {
    try {
        jwt.verify(req.token, process.env.JWT_KEY, (err, authorizedData) => {
            if (err) {
                res.status(403).json({
                    message: "protected Route"
                });
            } else {
                if (authorizedData.hasOwnProperty("admin")) {
                    res.status(200).send(authorizedData);
                } else {
                    res.status(403).json({ message: "Unauthorized access to donor's profile" });
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            name: err.name,
            error: err.message
        })
    }
}

module.exports.verifyAdmin = (req, res) => {
    const admin = {
        admin_name: "Admin"
    }
    try {
        if (req.body.admin_key == process.env.ADMIN_KEY) {
            jwt.sign(
                { admin },
                process.env.JWT_KEY,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) {
                        res.status(500).json({
                            name: err.name,
                            error: err.message
                        })
                    }
                    res.status(200).json({
                        message: "Admin Verification Successful",
                        token: token,
                        role: "admin",
                    });
                }
            );
        }
        else {
            res.status(401).json({
                message: "Wrong key",
            });
        }
    } catch (err) {
        res.status(500).json({
            name: err.name,
            error: err.message
        })
    }
}
