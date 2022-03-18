const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    typeOfCode: {
        type: String,
        required: true,
        enum: ['flat','upto']
    },
    priceDeduct: {
        type: Number,
        min: 500
    },
    percentDeduct: {
        type: Number,
        min: 5,
        max: 100
    },
    code: {
        type: String,
        required: true, 
        unique: true
    },
    desc: {
        type: String, 
        maxlength: 200
    },
    sd: {
        type: Date, 
        default: Date.now()
    },
    ed: {
        type: Date,
        required: true
    },
    minAmt: {
        type: Number,
        min: 500, 
        required: true
    },
    maxPercent: {
        type: Number,
        min: 500
    },
});

const CouponModel = mongoose.model('CouponModel', CouponSchema);
module.exports = CouponModel;