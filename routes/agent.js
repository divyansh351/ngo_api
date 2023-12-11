const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Agent = require("../controllers/agent");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const passport = require("passport");
const { checkToken } = require("../middleware");

const router = express.Router();

router
  .route("/register")
  .post(upload.array("image"), catchAsync(Agent.registerAgent));
router.route("/login").post(
  passport.authenticate("local", {
    failureRedirect: "/agent/failure",
    failureMessage: true,
  }),
  Agent.loginAgent
);
router.route("/view").get(checkToken, Agent.viewAgent);
router
  .route("/failure")
  .get((req, res) => res.status(401).json({ message: req.session.messages[0] }));
router.route("/getTopAgent").get(Agent.getTopAgent);

router.route("/verification").post(checkToken, Agent.verifyAgent)
router.route("/toggleActivity").post(checkToken, Agent.toggleActivity);

module.exports = router;
