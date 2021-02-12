const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares')
const lineitemController = require('../controller/line_items.controller');

router.post("/addLine_item", [authJwt.verifyToken], lineitemController.addLineItem);

router.get("/listLine_item", [authJwt.verifyToken], lineitemController.allLineItems);

router.get("/getLine_item/:id", [authJwt.verifyToken], lineitemController.getLineItem);

router.get("/getLine_itemByItemId/:item_id", [authJwt.verifyToken], lineitemController.getLineItemsbyItemId);

router.get("/Line_itemByBidId/:bid_id", [authJwt.verifyToken], lineitemController.getLineItemsbyBidId);

router.put("/updateLine_item", [authJwt.verifyToken], lineitemController.updateLineItem);

router.delete("/deleteLine_item", [authJwt.verifyToken], lineitemController.deleteLineItem);

module.exports = router;