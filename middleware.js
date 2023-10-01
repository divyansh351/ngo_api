module.exports.isAdminLoggedIn = (req, res, next) => {
    if (req.session.tag == 1) {
        next()
    }
    else {
        res.status(401).send("You are not an Admin")
    }
}
module.exports.isAgentLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        res.status(401).send("unauthorized access")
    } else next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isDonorLoggedIn = (req, res, next) => {
    if (req.session.current_donor_id) {
        next()
    }
    else {
        res.status(401).send("You are not logged in")
    }
}