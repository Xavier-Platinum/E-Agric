const router = require("express").Router();


// Destructuring Routes
const { vendorIndex } = require("../../controllers/vendorsControlles/vendors.controller");

// home route
router.get("/",vendorIndex);

module.exports = router