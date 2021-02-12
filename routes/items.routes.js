const express = require('express')
const router = express.Router();
const { authJwt } = require("../middlewares");
const itemController = require("../controller/items.controller");


router.post("/addItem", [authJwt.verifyToken], itemController.addItem);

router.get("/items", [authJwt.verifyToken], itemController.allItems);

router.get("/item/:id", [authJwt.verifyToken], itemController.getItem);

router.delete("/deleteItem", [authJwt.verifyToken], itemController.deleteItem);

router.put("/updateItem", [authJwt.verifyToken], itemController.updateItem);


module.exports = router