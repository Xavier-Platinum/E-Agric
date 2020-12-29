const { Farmer } = require("../../models/farmersModel/farmers.model")

module.exports = {
    index: (req, res) => {
        const pageTitle = "Admin"
        res.render("adminViews/admin", { pageTitle });
    },
    all_farmersGet: async (req, res) => {
        await Farmer.find({approved: false})
        .exec((err, farmers) => {
            if (err) throw err;
            else {
                let pageTitle = "All Farmers";
                res.render("adminViews/all-farmers", { pageTitle, farmers });
            }
        })
    }
}