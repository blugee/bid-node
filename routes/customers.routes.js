const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controller/customers.controller");


router.post("/addCustomer", [authJwt.verifyToken], controller.addCustomer);

router.get("/customers", [authJwt.verifyToken], controller.allCustomers);
router.get("/getCustomer/:id", [authJwt.verifyToken], controller.getCustomer);

router.delete("/deleteCustomer", [authJwt.verifyToken], controller.deleteCustomer);

router.put("/updateCustomer", [authJwt.verifyToken], controller.updateCustomer);

module.exports = router;