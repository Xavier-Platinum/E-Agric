const passport = require("passport");

module.exports = {
    authRegisterGet: (req, res) => {
        const pageTitle = "Register";
        res.render("auth/register", { pageTitle });
    },
    authLoginGet: (req, res) => {
        const pageTitle = "Login";
        res.render("auth/login", { pageTitle });
    },
    authLoginPost: (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/profile",
            failureRedirect: "/auth/login",
            failureFlash: true,
            // successFlash: true,
            // session: true
        })(req, res, next)
        // res.send("user is logged in")
    },
    logout: async(req, res) => {
        await req.logout();
        await req.flash("success_msg", "See You Later");
        await res.redirect("/auth/login");
        console.log("User Logged Out");
    }
}