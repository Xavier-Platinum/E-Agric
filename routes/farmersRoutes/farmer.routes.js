const router = require("express").Router();

// destructuring controllers
const { farmersRegisterGet, farmersRegisterPost } = require("../../controllers/farmersControllers/farmers.controller");

// router.get("/register", farmersRegisterGet, farmersRegisterPost);

// 
router.route("/register")
.get(farmersRegisterGet)
.post(farmersRegisterPost);


module.exports = router;