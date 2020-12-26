module.exports = {
    ensureAdmin: (req, res, next) => {
        if(req.user.role === "Admin") {
            next();
            return; 
        } else {
            req.flash("msg", "Sorry Access Not Granted");
            res.redirect(`/${originalUrl}`);
        }
    },
    ensureAuthenticated: (req, res, next) => {
        if(isAuthenticated()){
            return next();
        } else {
            req.flash("msg", "Sorry You are Not Permitted");
            res.redirect(`/${originalUrl}`);
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
    }
}