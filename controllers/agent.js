const Agent = require("../models/agent");
const jwt = require("jsonwebtoken");

module.exports.registerAgent = async (req, res) => {
  try {
    const {
      agent_name,
      agent_aadhar_number,
      agent_operation_area,
      agent_address,
      agent_mob_number,
      agent_email,
      username,
      password,
      agent_id_type,
      agent_active
    } = req.body;
    const agent = new Agent({
      agent_name: agent_name,
      agent_aadhar_number: agent_aadhar_number,
      agent_operation_area: agent_operation_area,
      agent_address: agent_address,
      agent_mob_number: agent_mob_number,
      agent_email: agent_email,
      username: username,
      agent_id_type: agent_id_type,
      agent_active: false,
      agent_verified: false
    });
    // agent.agent_photo = req.files.map((f) => ({
    //   url: f.path,
    //   filename: f.filename,
    // }));
    await Agent.register(agent, password);
    res.status(201).json({ message: "Agent Successfully registered" });
  } catch (e) {
    res.status(500).json({ name: e.name, message: e.message });
  }
};

module.exports.loginAgent = async (req, res) => {
  var username = req.body.username;
  const agent = await Agent.findOne({ username });
  try {
    jwt.sign(
      { agent },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          res.status(403).json({
            message: "protected Route"
          });
        }
        res.status(200).json({
          message: "Agent Login Successful",
          token: token,
          role: "agent",
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      name: err.name,
      error: err.message
    })
  }
};

module.exports.viewAgent = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authorizedData) => {
      if (err) {
        res.status(403).json({
          message: "protected Route"
        });
      } else {
        if (authorizedData.hasOwnProperty("agent") || authorizedData.hasOwnProperty("admin")) {
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


module.exports.verifyAgent = async (req, res) => {
  const {
    agent_id
  } = req.body

  try {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
      if (err) {
        res.status(403).json({
          message: "protected Route"
        });
      } else {
        if (authorizedData.hasOwnProperty("admin")) {
          const agent = await Agent.findById(agent_id)
          agent.agent_verified = true;
          await agent.save();
          res.status(200).json({ message: 'verified succesfully' })
        } else {
          res.status(401).json({ message: "Unauthorized access to agent's profile" });
        }
      }
    })
  } catch (e) {
    res.status(401).json({ name: e.name, message: e.message });
  }
};

module.exports.toggleActivity = async (req, res) => {
  const {
    agent_id,
    agent_active
  } = req.body
  try {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
      if (err) {
        res.status(403).json({
          message: "protected Route"
        });
      } else {
        if (authorizedData.hasOwnProperty("admin")) {
          await Agent.findByIdAndUpdate(agent_id, { agent_active: agent_active })
          res.status(200).json({ message: 'active status updated succesfully' })
        } else {
          res.status(401).json({ message: "Unauthorized access to agent's profile" });
        }
      }
    })
  } catch (e) {
    res.status(401).json({ name: e.name, message: e.message });
  }
};

module.exports.getTopAgent = async (req, res) => {
  try {
    const agent = await Agent.find({});
    agent.sort((a, b) => {
      return b.agent_products.length - a.agent_products.length;
    });
    res.status(200).json(agent);
  } catch (e) {
    res.status(401).json({ name: e.name, message: e.message });
  }
};
