const router = require("express").Router();

const { ensureAuthenticated, isFarmer } = require("../../config/auth.config");
// destructuring controllers
const { farmersIndex, farmersRegisterGet, farmersRegisterPost, farmers_profile_update, farmers_profile_updatePost } = require("../../controllers/farmersControllers/farmers.controller");

// router.get("/register", farmersRegisterGet, farmersRegisterPost);

// home route
router.get("/", ensureAuthenticated, isFarmer, farmersIndex)


// registration route
router.route("/register")
.get(farmersRegisterGet)
.post(farmersRegisterPost);

// profile update 
router.route("/update-profile")
.get(farmers_profile_update)
.post(farmers_profile_updatePost);


module.exports = router;