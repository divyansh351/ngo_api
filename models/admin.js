const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AdminSchema = new Schema({
    admin_name: String,
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

AdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('admin', AdminSchema);