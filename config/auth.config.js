module.exports = {
    isAdmin: (req, res, next) => {
        if(req.isAuthenticated() && req.user.role === "admin") {
            next();
            return;
        } else {
            req.flash("error_msg", "Sorry Admin Privilleges required");
            res.redirect("/auth/login");
            // res.redirect(`/${req.originalUrl}`);
        }
    },
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        } else {
            req.flash("msg", "Sorry You are Not Authenticated");
            res.redirect("/auth/login")
            // res.redirect(`/${originalUrl}`);
        }
    },
    authenticateUser: (req, res, next) => {
        if(req.user = null) {
            res.status(403);
            return req.flash("msg", "You Need to Sign-In");
        }

        next()
    },
    authenticateRole: (role) => {
        return (req, res, next) => {
            if(req.user.role !== role) {
                res.status(401);
                return req.flash("msg", "Not Authorised")
            }

            next();
        } //authenticateRole(role.ADMIN);
    }, 
    isFarmer: (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === "farmer") {
            return next();
        } else {
            req.flash("error_msg", "Sorry Your are not a permitted user");
            res.redirect(`/${req.originalUrl}`);
        }
    }, 
    isVendor: (req, res, next) => {
        if (req.user.role === "vendor") {
            return next();
        } else {
            req.flash("error_msg", "Sorry Your are not a permitted user");
            res.redirect(`/${req.originalUrl}`);
        }
    }, 
    isUser: (req, res, next) => {
        if (req.user.role === "user") {
            return next();
        } else {
            req.flash("error_msg", "Sorry Your are not a permitted user");
            res.redirect(`/${req.originalUrl}`);
        }
    }
}