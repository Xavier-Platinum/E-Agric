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
            successRedirect: "/",
            failureRedirect: "/auth/login",
            failureFlash: true,
            // successFlash: true,
            // session: true
        })(req, res, next)
    },
    logout: async(req, res) => {
        await req.logout();
        await req.flash("success_msg", "See You Later");
        await res.redirect("/");
        console.log("User Logged Out");
    }
}