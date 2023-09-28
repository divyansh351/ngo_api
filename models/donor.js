const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const DonorSchema = new Schema({
    donor_name: String,
    // photo
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
    donor_id_number: String,
    donor_pan_number: {
        type: String,
        unique: true
    },
    donor_anonymous: Boolean,
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

DonorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('donor', DonorSchema);