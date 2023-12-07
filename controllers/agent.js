const Agent = require("../models/agent");
const jwt = require("jsonwebtoken");

module.exports.registerAgent = async (req, res) => {
  try {
    console.log("HELLO1");
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
      agent_active: agent_active,
      agent_verified: false
    });
    console.log("HELLO2");
    // agent.agent_photo = req.files.map((f) => ({
    //   url: f.path,
    //   filename: f.filename,
    // }));
    const registeredAgent = await Agent.register(agent, password);
    console.log(registeredAgent);

    res.json({ message: "Agent Successfully registered" });
  } catch (e) {
    res.json(e.message);
  }
};

module.exports.loginAgent = async (req, res) => {
  var username = req.body.username;
  const agent = await Agent.findOne({ username });
  jwt.sign(
    { agent },
    process.env.JWT_KEY,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        console.log(err);
      }
      res.json({
        message: "Agent Login Successful",
        token: token,
        role: "agent",
      });
    }
  );
};

module.exports.viewAgent = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authorizedData) => {
      if (err) {
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        if (authorizedData.hasOwnProperty("agent") || authorizedData.hasOwnProperty("admin")) {
          res.send(authorizedData);
        } else {
          res.json({ message: "Unauthorized access to agent's profile" });
        }
      }
    });
  } catch (e) {
    res.send(e);
  }
};


module.exports.verifyAgent = async (req, res) => {
  const {
    agent_id
  } = req.body

  try {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, authorizedData) => {
      if (err) {
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        if (authorizedData.hasOwnProperty("admin")) {
          console.log(req.body)
          const agent = await Agent.findById(agent_id)
          agent.agent_verified = true;
          await agent.save();
          res.json({ message: 'verified succesfully' })
        } else {
          res.json({ message: "Unauthorized access to agent's profile" });
        }
      }
    })
  } catch (e) {
    res.send(e);
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
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        if (authorizedData.hasOwnProperty("admin")) {
          await Agent.findByIdAndUpdate(agent_id, { agent_active: agent_active })
          res.json({ message: 'active status updated succesfully' })
        } else {
          res.json({ message: "Unauthorized access to agent's profile" });
        }
      }
    })
  } catch (e) {
    res.send(e);
  }
};

module.exports.getTopAgent = async (req, res) => {
  try {
    const agent = await Agent.find({});
    // res.send(agent);
    agent.sort((a, b) => {
      return b.agent_products.length - a.agent_products.length;
    });
    res.json(agent);
  } catch (e) {
    res.send(e);
  }
  // res.send("it works");
};
