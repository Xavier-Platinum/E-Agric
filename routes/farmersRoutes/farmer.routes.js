const router = require("express").Router();

const { ensureAuthenticated, isFarmer } = require("../../config/auth.config");
// destructuring controllers
const { farmersIndex, farmersRegisterGet, farmersRegisterPost } = require("../../controllers/farmersControllers/farmers.controller");

// router.get("/register", farmersRegisterGet, farmersRegisterPost);

// home route
router.get("/", ensureAuthenticated, isFarmer, farmersIndex)


// registration route
router.route("/register")
.get(farmersRegisterGet)
.post(farmersRegisterPost);


module.exports = router;