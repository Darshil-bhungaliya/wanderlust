const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirecturl } = require("../middlewares.js")
const userController = require("../controllers/users.js");

router.get("/signup", userController.rendersignupform);

router.post("/signup", wrapasync(userController.signup))

//LOGIN USER

router.get("/login", userController.renderloginform)

router.post("/login", saveRedirecturl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)

//logout user

router.get("/logout", userController.logout)

module.exports = router;    