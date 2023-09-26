const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new Schema({
    admin_name: String,
    admin_photo: String,
    admin_mob_number: {
        type: String,
        required: true,
        unique: true
    },
    admin_email: String,
    remark1: String,
    remark2: String,
    remark3: String,
    remark4: String,
    remark5: String
});

donorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('admin', adminSchema);