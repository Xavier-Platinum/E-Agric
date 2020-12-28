module.exports = {
    vendorIndex: (req, res) => {
        const pageTitle = "Dashboard";
        res.render("vendorsViews/index", { pageTitle });
    }
}