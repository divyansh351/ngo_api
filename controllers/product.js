const Product = require("../models/product");
const Donor = require("../models/donor");
const Agent = require("../models/agent");
const nodemailer = require("nodemailer");

module.exports.showProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ name: e.name, message: e.message });
    }
};

module.exports.donateProduct = async (req, res) => {
    try {
        const {
            product_title,
            product_category,
            product_description_before,
            product_defects_before,
            product_area_of_donation,
            donor_mob_number,
        } = req.body;
        const product = new Product({
            product_title: product_title,
            product_category: product_category,
            product_description_before: product_description_before,
            product_defects_before: product_defects_before,
            product_area_of_donation: product_area_of_donation,
        });
        product.product_pictures_before = req.files.map((f) => ({
            url: f.path,
            filename: f.filename,
        }));
        const donor = await Donor.findOne({ donor_mob_number: donor_mob_number });
        product.product_donor = donor.id;
        await product.save();
        donor.donor_products.push(product.id);
        await donor.save();
        res.status(201).json({
            message: "Donation Success"
        });
    } catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
};

module.exports.assignAgent = async (req, res) => {
    try {
        const { product_id, agent_id } = req.body;
        let x = Math.floor(100000 + Math.random() * 900000)
        const product = await Product.findById({ _id: product_id });
        await (await product.populate("product_donor")).populate("product_agent");
        if (product !== null) {
            if (product.product_agent == undefined) {
                await Product.findByIdAndUpdate(product_id, {
                    product_agent: agent_id,
                    product_otp: x
                });
                await Agent.findByIdAndUpdate(agent_id, {
                    $push: { agent_products: product_id },
                });
                res.status(200).json({
                    message: "agent succesfully assigned",
                });
            } else {
                res.status(403).json({
                    Error: "Product already assigned to an agent",
                });
            }
        } else {
            res.status(404).json({
                message: "No such product",
            });
        }
    } catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
};

module.exports.collectProduct = async (req, res) => {
    try {
        const { product_id, agent_id, product_otp } = req.body;
        const product = await Product.findById(product_id);
        if (agent_id == product.product_agent) {
            if (product_otp == product.product_otp) {
                product.product_collection_status = 1;
                await product.save();
                res.status(200).json({
                    message: "Product succesfully collected",
                });
            }
            else {
                res.status(403).json({
                    message: "wrong otp",
                });
            }
        } else {
            res.status(403).json({
                message: "Product is currently not assigned to you!",
            });
        }
    } catch (e) {
        res.status(500).json({ name: e.name, message: e.message });

    }
};

module.exports.repairProduct = async (req, res) => {
    try {
        const {
            product_id,
            agent_id,
            product_description_after,
            product_defects_after,
            product_repair_amount,
        } = req.body;
        const product = await Product.findById(product_id);
        if (product.product_agent == agent_id) {
            // product.product_pictures_after = req.files.map((f) => ({
            //   url: f.path,
            //   filename: f.filename,
            // }));
            product.product_defects_after = product_defects_after;
            product.product_description_after = product_description_after;
            product.product_repair_status = 1;
            product.product_repair_amount = product_repair_amount;
            await product.save();
            res.status(200).json({
                message: "Product details Succesfully Updated",
            });
        } else {
            res.status(403).json({
                message: "This product is assigned to someone else.",
            });
        }
    } catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
};

module.exports.viewProduct = async (req, res) => {
    try {
        const product_id = req.params.id;
        const product = await Product.findById(product_id);
        await (await product.populate("product_donor")).populate("product_agent");
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ message: e.message, name: e.name });
    }
};

module.exports.receiveProduct = async (req, res) => {
    try {
        const { product_id, agent_id } = req.body;
        const product = await Product.findById(product_id);
        if (agent_id == product.product_agent) {
            product.product_received = 1;
            await product.save();
            res.status(200).json({
                message: "Final Donation Successful",
            });
        } else {
            res.status(403).json({
                message: "Product is currently not assigned to you!",
            });
        }
    } catch (e) {
        res.status(500).json({ name: e.name, message: e.message });
    }
};
