const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceiverSchema = new Schema({
    receiver_aadhar_number: {
        type: String,
        required: true,
        unique: true
    },
    receiver_products: [
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

module.exports = mongoose.model('receiver', ReceiverSchema);