const express = require("express");
let router = express.Router();

let UsersController = require("./controller.js");

router.post("/user/registration", UsersController.registration);
router.post("/user/login", UsersController.login);
router.get("/user/:token/:refreshToken", UsersController.authentication);
router.put("/user/:token", UsersController.authentication);

router.get("/users", UsersController.getAllOnline);

module.exports = router;
