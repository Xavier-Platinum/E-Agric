const router = require("express").Router();


// Destructuring Routes
const { vendorIndex, vendorRegistrationGet, vendorRegistrationPost } = require("../../controllers/vendorsControlles/vendors.controller");

// home route
router.get("/",vendorIndex);


// Registration route
router.route("/register")
.get(vendorRegistrationGet)
.post(vendorRegistrationPost);

module.exports = router