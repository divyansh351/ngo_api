const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_title: String,
    product_category: String,
    product_purchase_bill: String,
    product_pictures_before: [String],
    product_pictures_after: [String],
    product_description_before: String,
    product_description_after: String,
    product_defects_before: [String],
    product_defects_after: [String],
    product_area_of_donation: String,
    product_collection_status: Boolean,
    product_reimbursement_status: Boolean,
    product_repair_bill: String,
    product_repair_amount: Number,
    product_taken: Boolean,
    product_donor: {
        type: Schema.Types.ObjectId,
        ref: 'donor'
    },
    product_agent: {
        type: Schema.Types.ObjectId,
        ref: 'donor'
    },
    remark1: String,
    remark2: String,
    remark3: String,
    remark4: String,
    remark5: String
});

module.exports = mongoose.model('product', productSchema);