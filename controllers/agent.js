const Agent = require('../models/agent')

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
            agent_active: agent_active
        })
        agent.agent_photo.url = req.file.path;
        agent.agent_photo.filename = req.file.filename;
        const registeredAgent = await Agent.register(agent, password);
        console.log(registeredAgent);
        res.send("Agent Successfully registered")
    } catch (e) {
        res.send(e);
    }
}

module.exports.viewAgent = async (req, res) => {
    try {
        console.log(req.session);
        const agent = await Agent.findOne({ username: req.session.passport.user });
        res.send(agent);
    } catch (e) {
        res.send(e);
    }
}