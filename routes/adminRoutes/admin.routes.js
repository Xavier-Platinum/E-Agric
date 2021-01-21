const router = require("express").Router();

const { isAdmin, ensureAuthenticated } = require("../../config/auth.config");
// Destructuring Routes
const { index, all_farmersGet, approve, decline, all_vendorsGet, all_usersGet, categoryGet, categoryPost, addCategoryGet, addCategoryPost, all_productsGet, all_approvedProductsGet } = require("../../controllers/adminControllers/admin.controller");

// home route
router.get("/", ensureAuthenticated, isAdmin, index);

// All farmers
router.get("/all-farmers", ensureAuthenticated, isAdmin, all_farmersGet);

// all Vendors
router.get("/all-vendors", ensureAuthenticated, isAdmin, all_vendorsGet);

// All Users
router.get("/all-users", ensureAuthenticated, isAdmin, all_usersGet);

// approve farmer
router.get("/approve/:_id", ensureAuthenticated, isAdmin, approve);

// decline farmer
router.get("/delete/:_id", ensureAuthenticated, isAdmin, decline);

// call categories
router.get("/category", ensureAuthenticated, isAdmin, categoryGet)

// categories routes
router.route("/add-category")
.get(addCategoryGet)
.post(addCategoryPost);

// products routing
router.get("/all-products", all_productsGet);

// approved products routing
router.get("/approved-products", all_approvedProductsGet);

module.exports = router;