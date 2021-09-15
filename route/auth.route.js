const router = require('express').Router();
const AuthActions = require("../controller/auth.controller")


router.post("/login",  AuthActions.login);
router.post("/signup",AuthActions.signup)


module.exports = router