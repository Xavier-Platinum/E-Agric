const router = require("express").Router();


const { ensureAuthenticated, isVendor } = require("../../config/auth.config");
// Destructuring Routes
const { vendorIndex, vendorRegistrationGet, vendorRegistrationPost } = require("../../controllers/vendorsControlles/vendors.controller");

// home route
router.get("/", ensureAuthenticated, isVendor, vendorIndex);


// Registration route
router.route("/register")
.get(vendorRegistrationGet)
.post(vendorRegistrationPost);

module.exports = router