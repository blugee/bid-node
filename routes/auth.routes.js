const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controller/auth.controller");


router.post("/auth/signup", [verifySignUp.checkDuplicateNameOrEmail], controller.signup);
router.post("/auth/signin", controller.signin);

module.exports = router;