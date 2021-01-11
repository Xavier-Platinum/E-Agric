const router = require("express").Router();


const { ensureAuthenticated, isUser } = require("../../config/auth.config");
// Destructuring Routes
const { userIndex, userRegistrationGet, userRegistrationPost } = require("../../controllers/usersControllers/users.controllers");

// home route
router.get("/", ensureAuthenticated, isUser, userIndex);


// Registration route
router.route("/register")
.get(userRegistrationGet)
.post(userRegistrationPost);

module.exports = router