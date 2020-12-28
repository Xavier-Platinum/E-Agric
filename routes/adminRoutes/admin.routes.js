const router = require("express").Router();


// Destructuring Routes
const { index } = require("../../controllers/adminControllers/admin,controller");

// home route
router.get("/",index);

module.exports = router;