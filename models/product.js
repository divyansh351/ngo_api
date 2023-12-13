const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_title: String,
    product_category: String,
    product_pictures_before: [
        {
            url: String,
            filename: String
        }
    ],// original bill is here
    product_pictures_after: [
        {
            url: String,
            filename: String
        }
    ],// repair bill is here
    product_description_before: String,
    product_description_after: String,
    product_defects_before: String,
    product_defects_after: String,
    product_area_of_donation: String,
    product_collection_status: {
        type: Boolean,
        default: 0
    },
    product_reimbursement_status: {
        type: Boolean,
        default: 0
    },
    product_repair_status: {
        type: Boolean,
        default: 0
    },
    product_repair_amount: {
        type: Number,
        default: 0
    },
    product_received: {
        type: Boolean,
        default: 0
    },
    product_donor: {
        type: Schema.Types.ObjectId,
        ref: 'donor'
    },
    product_agent: {
        type: Schema.Types.ObjectId,
        ref: 'agent'
    },
    product_receiver: {
        type: Schema.Types.ObjectId,
        ref: 'receiver'
    },
    product_otp: Number,
    remark1: String,
    remark2: String,
    remark3: String,
    remark4: String,
    remark5: String
});

module.exports = mongoose.model('product', ProductSchema);