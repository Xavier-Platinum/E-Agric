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
    }
}