const router = require("express").Router();


// Destructuring Routes
const { userIndex, userRegistrationGet, userRegistrationPost } = require("../../controllers/usersControllers/users.controllers");

// home route
router.get("/", userIndex);


// Registration route
router.route("/register")
.get(userRegistrationGet)
.post(userRegistrationPost);

module.exports = router