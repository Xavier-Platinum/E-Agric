module.exports = {
    globalVariables: (req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        res.locals.user = req.user ? true : false;
        res.locals.session = req.session;
        res.locals.cart = req.session.cart
        
        next();
    }
}