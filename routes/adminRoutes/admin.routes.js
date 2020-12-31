const router = require("express").Router();

// Destructuring Routes
const { index, all_farmersGet, approve, decline, all_vendorsGet, all_usersGet } = require("../../controllers/adminControllers/admin.controller");

// home route
router.get("/",index);

// All farmers
router.get("/all-farmers", all_farmersGet);

// all Vendors
router.get("/all-vendors", all_vendorsGet);

// All Users
router.get("/all-users", all_usersGet);

// approve farmer
router.get("/approve/:_id", approve);

// decline farmer
router.get("/decline/:_id", decline);

module.exports = router;