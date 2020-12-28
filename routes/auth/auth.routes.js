const router = require("express").Router();

// const farmers =  [];

// Desturcturing controllers
const { registerGet, farmersRegisterPost } = require("../../controllers/auth/auth.controllers");

router.route("/register")
.get(registerGet)
.post(farmersRegisterPost);

module.exports = router;