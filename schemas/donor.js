const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const donorSchema = new Schema({
    donor_name: String,
    donor_photo: String,
    donor_mob_number: {
        type: String,
        required: true,
        unique: true
    },
    donor_address: String,
    donor_email: {
        type: String,
        required: true,
        unique: true
    },
    donor_id_type: String,
    donor_id_photo: String,
    donor_anonymous: Boolean,
    donor_pan_number: {
        type: String,
        required: true,
        unique: true
    },
    donor_products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    remark1: String,
    remark2: String,
    remark3: String,
    remark4: String,
    remark5: String
})

donorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('donor', donorSchema);