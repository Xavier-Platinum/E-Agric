const router = require("express").Router();

// destructuring controllers
const { farmersIndex, farmersRegisterGet, farmersRegisterPost } = require("../../controllers/farmersControllers/farmers.controller");

// router.get("/register", farmersRegisterGet, farmersRegisterPost);

// home route
router.get("/", farmersIndex)


// registration route
router.route("/register")
.get(farmersRegisterGet)
.post(farmersRegisterPost);


module.exports = router;