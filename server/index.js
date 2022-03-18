const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const Coupon = require('./models/coupon');
const port = process.env.PORT;
const app = express();
const cors = require('cors');
const checkOnCouponData = require('./util/alterationsOnCoupon');

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to DataBase...');
    app.listen(port, () => {
        console.log("SERVER RUNNNING ON PORT:",port);
    })
})
.catch((error) => console.log(error));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/coupon-codes',(req, res) => {
    console.log('--- All Coupon Codes Fetched Request');
    Coupon.find()
    .then(value => res.send(value))
    .catch(error => {
        res.status(404);
        res.send(error);
    });
})

app.post('/create-coupon',(req, res) => {
    console.log('--- Creating Coupon Request');
    const coupon = new Coupon(req.body);
    coupon.save()
    .then(result => res.send(result))
    .catch(error => {
        res.status(404);
        res.send(error);
    });
})

app.post('/redeem-coupon',(req, res) => {
    console.log('--- Redeem Coupon Code');
    const {couponCode, totalAmt} = req.body;
    Coupon.findOne({code: couponCode})
    .then(val => {
        // console.log(val);
        checkOnCouponData(val, totalAmt)
        .then((value) => res.send(value))
        .catch((error) => {
            res.status(404);
            res.send(error);
        })
    })
    .catch(err => console.log(err));
});