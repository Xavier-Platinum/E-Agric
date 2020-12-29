const router = require("express").Router();

// Destructuring Routes
const { index, all_farmersGet } = require("../../controllers/adminControllers/admin,controller");

// home route
router.get("/",index);

// All farmers
router.get("/all-farmers", all_farmersGet)

module.exports = router;