module.exports = {
    index: (req, res) => {
        const pageTitle = "Admin"
        res.render("adminViews/admin", { pageTitle });
    }
}