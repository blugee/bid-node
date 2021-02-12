const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const userController = require("../controller/users.controller");


router.post("/addUser", [authJwt.verifyToken], userController.addUser);

router.delete("/deleteUser", [authJwt.verifyToken], userController.deleteUser);

router.put("/updateUser", [authJwt.verifyToken], userController.updateUser);

router.get("/listUsers", [authJwt.verifyToken], userController.allUsers);

router.get("/user/:id", [authJwt.verifyToken], userController.getUser);

module.exports = router;