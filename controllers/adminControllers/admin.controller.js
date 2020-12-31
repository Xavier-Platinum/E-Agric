const { Farmer } = require("../../models/farmersModel/farmers.model");
const { Vendor } = require("../../models/vendorsModels/vendors.model");
const { User } = require("../../models/usersModels/users.model");
// const { } = require("../../models/adminModels/")

module.exports = {
    index: (req, res) => {
        const pageTitle = "Admin"
        res.render("adminViews/admin", { pageTitle });
    },
    all_farmersGet: async (req, res) => {
        await Farmer.find({approved: false})
        .exec(async(err, farmers) => {
            await Farmer.find({approved: true})
            .exec(async(err, farmersApproved) => {
                let pageTitle = "All Farmers";
                await res.render("adminViews/all-farmers", { pageTitle, farmers, farmersApproved });
            })
            // if (err) throw err;
            // else {
            //     let pageTitle = "All Farmers";
            //     await res.render("adminViews/all-farmers", { pageTitle, farmers });
            // }
        })
    },
    all_vendorsGet: async(req, res) => {
        await Vendor.find({ approved: false })
        .exec((err, vendors) => {
            if (err) throw err;
            else {
                let pageTitle = "All Vendors"
                res.render("adminViews/all-vendors", { pageTitle, vendors });
            }
        })
    },
    all_usersGet: async(req, res) => {
        await User.find({})
        .exec((err, users) => {
            if (err) throw err;
            else {
                let pageTitle = "All Users";
                res.render("adminViews/all-users", { pageTitle, users });
            }
        })
    },
    approve: async(req, res, done) => {
        let _id = req.params._id;
        console.log(_id);
        await Farmer.findOne({_id})
        .then(async(approve) => {
            if(!approve) {
                await Vendor.find({_id})
                .then(async(approve) => {
                    if(!approve) {
                        return done(null, false, req.flash("error", `Could not approve user ${approve.id}`))
                    }
                    else {
                        approve.approved = true;
                        await approve.save();
                        console.log(`${approved.id} has been approved successfully`);
                        req.flash("success_msg", `${approved.id} has been approved successfully`)
                        res.redirect("/admin/all-vendors")
                    }
                }).catch((err) => console.log(err));
            } else {
                approve.approved = true
                await approve.save();
                console.log(`${approve.id} has been approved successfully`);
                req.flash("success_msg", `${approve.id} has been approved successfully`)
                res.redirect("/admin/all-farmers")
            }
        }).catch((err) => console.log(err))
    },
    decline: async(req, res, done) => {
        const id = req.params._id;
        await Farmer.findByIdAndDelete(id)
        .then(async(declined) => {
            if(!declined) {
                await Vendor.findByIdAndDelete(id)
                .then(async(declined) => {
                    if(!declined) {
                        return done(null, false, req.flash("error", `Could Not Decline ${declined.id}`))
                    } else {
                        console.log(`${declined} has been deleted`);
                        req.flash("success_msg", `${declined} has been deleted`);
                        res.redirect("/admin/all-vendors")
                    }
                }).catch(err => console.log(err))
            } else {
                console.log(`${declinedFarmer} has been deleted`);
                res.redirect("/admin/all-farmers");
                return;
            }
        })
        .catch((err) => console.log(err));
    }
}