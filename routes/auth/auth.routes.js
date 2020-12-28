const router = require("express").Router();

const farmers =  [];

// Desturcturing controllers
const { farmersGet, farmersPost } = require("../../controllers/auth/auth.controllers");

router.route("/farmer")
.get(farmersGet)
.post(farmersPost);

module.exports = router;