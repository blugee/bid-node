const express = require('express');
const router = express.Router();
const bidController = require('../controller/bids.controller');
const { authJwt } = require('../middlewares');

router.post("/addBid", [authJwt.verifyToken], bidController.addBid);

router.get("/getBidList", [authJwt.verifyToken], bidController.allBids);

router.get("/getBid/:id", [authJwt.verifyToken], bidController.getBid);

router.get("/getBidByCustomerId/:customer_id", [authJwt.verifyToken], bidController.getBidByCustomerId);

router.get("/getBidByDate/:date", [authJwt.verifyToken], bidController.getBidByDate);

router.put("/updateBid", [authJwt.verifyToken], bidController.updatebid);

router.delete("/deleteBid", [authJwt.verifyToken], bidController.deletebid);

module.exports = router;