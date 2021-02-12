const express = require('express');
const router = express.Router();
const Auth = require('./auth.routes');
const Items = require('./items.routes');
const Bid = require('./bids.routes');
const Customer = require('./customers.routes');
const Line_item = require('./line_item.routes');
const User = require('./users.routes');


router.get("/", function (req, res, next) {
    res.send('Express Server is Running...')
});

router.use(
    "/",
    Auth,
    Items,
    Bid,
    Customer,
    Line_item,
    User
);


module.exports = router;