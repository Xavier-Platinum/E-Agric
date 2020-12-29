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
    },
    approve_farmer: async(req, res) => {
        let _id = req.params._id;
        console.log(_id);
        await Farmer.findOne({_id})
        .then(async(approveFarmer) => {
            approveFarmer.approved = true;
            approveFarmer.save();
            res.redirect("/admin/all-farmers");
        })
        .catch((err) => console.log(err));
    },
    decline_farmer: async(req, res) => {
        const id = req.params._id;
        await Farmer.findByIdAndDelete(id)
        .then((declinedFarmer) => {
            console.log(`${declinedFarmer} has been deleted`);
            res.redirect("/admin/all-farmers");
            return;
        })
        .catch((err) => console.log(err));
    }
}