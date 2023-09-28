const Product = require('../models/product')
const Donor = require('../models/donor')

module.exports.show = async (req, res) => {
    const products = await Product.find({})
    res.json(products);
}

module.exports.donateProduct = async (req, res) => {
    console.log(req.files);

    // res.send("it works");
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
    product.product_pictures_before = req.files.map(f => ({ url: f.path, filename: f.filename }))
    const donor = await Donor.findOne({ donor_mob_number: donor_mob_number })
    product.product_donor = donor.id;
    console.log(product);
    await product.save();
    res.send("workkkk");
}