const Agent = require('../models/agent')

module.exports.registerAgent = async (req, res) => {
    const {
        agent_name,
        agent_aadhar_number,
        agent_operation_area,
        agent_address,
        agent_mob_number,
        agent_email,
        agent_id_type,
        agent_active
    } = req.body;
    // console.log(req.body)
    const agent = new Agent({
        agent_name: agent_name,
        agent_aadhar_number: agent_aadhar_number,
        agent_operation_area: agent_operation_area,
        agent_address: agent_address,
        agent_mob_number: agent_mob_number,
        agent_email: agent_email,
        agent_id_type: agent_id_type,
        agent_active: agent_active
    })
    agent.agent_photo.url = req.file.path;
    agent.agent_photo.filename = req.file.filename;
    await agent.save();
    res.send("registerAgent works fine")
}
