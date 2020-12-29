const router = require("express").Router();

// const farmers =  [];

// Desturcturing controllers
const { authRegisterGet} = require("../../controllers/auth/auth.controllers");

// router.route("/register")
// .get(authRegisterGet)
// .post(farmersRegisterPost);

// Registration Portal 
router.get("/register", authRegisterGet);

module.exports = router;