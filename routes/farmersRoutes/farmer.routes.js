const router = require("express").Router();

const upload = require("../../config/multer");

const { ensureAuthenticated, isFarmer } = require("../../config/auth.config");
// destructuring controllers
const { farmersIndex, farmersRegisterGet, farmersRegisterPost, farmers_profile_update, farmers_profile_updatePost, add_productGet, all_products } = require("../../controllers/farmersControllers/farmers.controller");
const { product_post } = require("../../controllers/products/products.controller");

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
.post( upload.single("avatar"), farmers_profile_updatePost);

// router.get("/add-product", add_productGet)

// 
router.get("/all-products", all_products);

router.route("/add-product")
.get(add_productGet)
.post(upload.single("productImage"), product_post);


module.exports = router;