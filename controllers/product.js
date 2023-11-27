const Product = require('../models/product')
const Donor = require('../models/donor')
const Agent = require('../models/agent')

module.exports.showProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products);
    }
    catch (e) {
        res.send(e);
    }
}

module.exports.donateProduct = async (req, res) => {
    try {
        const {
            product_title,
            product_category,
            product_description_before,
            product_defects_before,
            product_area_of_donation,
            donor_mob_number
        } = req.body;
        const product = new Product({
            product_title: product_title,
            product_category: product_category,
            product_description_before: product_description_before,
            product_defects_before: product_defects_before,
            product_area_of_donation: product_area_of_donation
        })
        // product.product_pictures_before = req.files.map(f => ({ url: f.path, filename: f.filename }));
        const donor = await Donor.findOne({ donor_mob_number: donor_mob_number });
        product.product_donor = donor.id;
        console.log(product);
        await product.save();
        donor.donor_products.push(product.id);
        await donor.save();
        res.json({
            "message": "Donation Success"
        });
    } catch (e) {
        res.send(e);
    }
}
// check this
module.exports.assignAgent = async (req, res) => {
    try {
        const { product_id, agent_id } = req.body;
        const product = await Product.findByIdAndUpdate(product_id, { product_agent: agent_id })
        if (product.product_agent !== "0") res.json({
            "Error": "Product already assigned to an agent"
        })
        else {
            await Agent.findByIdAndUpdate(agent_id, { $push: { agent_products: product_id } })
            res.json({
                "message": "agent succesfully assigned"
            });
        }
    } catch (e) {
        res.send(e);
    }
}
//
module.exports.collectProduct = async (req, res) => {
    try {
        const { product_id, agent_id } = req.body;
        const product = await Product.findById(product_id);
        if (agent_id == product.product_agent) {
            product.product_collection_status = 1;
            await product.save();
            res.send("Product succesfully collected");
        }
        else {
            res.send("Product is currently not assigned to you!");
        }
    } catch (e) {
        res.send(e)
    }
}

module.exports.repairProduct = async (req, res) => {
    try {
        const {
            product_id,
            agent_id,
            product_description_after,
            product_defects_after,
            prodcut_repair_amount
        } = req.body;
        const product = await Product.findById(product_id);
        if (product.product_agent == agent_id) {
            product.product_pictures_after = req.files.map(f => ({ url: f.path, filename: f.filename }));
            prodcut.product_defects_after = product_defects_after
            product.product_description_after = product_description_after
            product.prodcut_repair_status = 1;
            product.prodcut_repair_amount = prodcut_repair_amount;
            await product.save();
            res.send("Product details Succesfully Updated")
        }
        else {
            res.send("This product is assigned to someone else.")
        }
    } catch (e) {
        res.send(e);
    }
}

module.exports.viewProduct = async (req, res) => {
    try {
        const product_id = req.params.id;
        console.log(product_id);
        const product = await Product.findById(product_id);
        await (await product.populate('product_donor')).populate('product_agent')
        res.json(product)
    } catch (e) {
        res.send(e);
    }
}
