const router = require("express").Router();

// const farmers =  [];

// Desturcturing controllers
const { authRegisterGet, authLoginGet, authLoginPost} = require("../../controllers/auth/auth.controllers");

// router.route("/register")
// .get(authRegisterGet)
// .post(farmersRegisterPost);

// Registration Portal 
router.get("/register", authRegisterGet);

// login route
router.route("/login")
.get(authLoginGet)
.post(authLoginPost);

module.exports = router;