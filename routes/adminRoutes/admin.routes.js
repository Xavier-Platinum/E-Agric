const router = require("express").Router();

// Destructuring Routes
const { index, all_farmersGet, approve_farmer, decline_farmer } = require("../../controllers/adminControllers/admin,controller");

// home route
router.get("/",index);

// All farmers
router.get("/all-farmers", all_farmersGet);

// approve farmer
router.get("/approveFarmer/:_id", approve_farmer);

// decline farmer
router.get("/declineFarmer/:_id", decline_farmer);

module.exports = router;