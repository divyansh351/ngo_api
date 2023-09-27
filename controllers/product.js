const Product = require('../schemas/product')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports.show = async (req, res) => {
    const products = await Product.find({})
    res.json(products);
}

module.exports.donateProduct = upload.array('before_pics'), (req, res) => {
    console.log(req.files);
    res.json(req.body);
}