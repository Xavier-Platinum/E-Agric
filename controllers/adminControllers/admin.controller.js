const { Farmer } = require("../../models/farmersModel/farmers.model");
const { Vendor } = require("../../models/vendorsModels/vendors.model");
const { User } = require("../../models/usersModels/users.model");
const { Category } = require("../../models/categoryModels/category.model");
const { Product } = require("../../models/products/products.model");
// const { } = require("../../models/adminModels/")

module.exports = {
    index: async(req, res) => {
        await Farmer.countDocuments( async(err, totalFarmers) => {
            await Vendor.countDocuments(async(err, totalVendors) => {
                await User.countDocuments(async(err, totalUsers) => {
                    const pageTitle = "Admin";
                    const name = req.user.name;
                    const email = req.user.email;
                    const avatar = req.user.avatar;
                    res.render("adminViews/admin", { pageTitle, totalFarmers, totalVendors, totalUsers, email, avatar, name})
                })
            })
        })
        // const pageTitle = "Admin"
        // res.render("adminViews/admin", { pageTitle });
    },
    all_farmersGet: async (req, res) => {
        await Farmer.find({approved: false})
        .exec(async(err, farmers) => {
            await Farmer.find({approved: true})
            .exec(async(err, farmersApproved) => {
                let pageTitle = "All Farmers";
                const name = req.user.name;
                    const email = req.user.email;
                    const avatar = req.user.avatar;
                await res.render("adminViews/all-farmers", { pageTitle, name, email, avatar, farmers, farmersApproved });
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
        .exec( async(err, vendors) => {
            await Vendor.find({ approved: true })
            .exec(async (err, vendorsApproved) => {
                let pageTitle = "All Vendors";
                const name = req.user.name;
                    const email = req.user.email;
                    const avatar = req.user.avatar;
                await res.render("adminViews/all-vendors", { pageTitle, name, email, avatar, vendors, vendorsApproved});
            })
            // if (err) throw err;
            // else {
                // let pageTitle = "All Vendors"
            //     // res.render("adminViews/all-vendors", { pageTitle, vendors });
            // }
        })
    },
    all_usersGet: async(req, res) => {
        await User.find({})
        .exec((err, users) => {
            if (err) throw err;
            else {
                let pageTitle = "All Users";
                const name = req.user.name;
                    const email = req.user.email;
                    const avatar = req.user.avatar;
                res.render("adminViews/all-users", { pageTitle, name, email, avatar, users });
            }
        })
    },
    approve: async(req, res, done) => {
        let _id = req.params._id;
        console.log(_id);
        await Farmer.findOne({_id})
        .then(async(approve) => {
            if(!approve) {
                await Vendor.findOne({_id})
                .then(async(approve) => {
                    if(!approve) {
                        await Product.findOne({_id})
                        .then(async(approve) => {
                            if(!approve) {
                                return done(null, false, req.flash("error", `Could not approve user ${approve.id}`))
                            } else {
                                approve.approved = true;
                                await approve.save();
                                console.log(`${approve.id} has been approved succesfully`);
                                req.flash("success_msg", `${approve.id} has been approved successfully`);
                                res.redirect("/admin/all-products");
                            }
                        }).catch((err) => console.log(err));
                    }
                    else {
                        approve.approved = true;
                        await approve.save();
                        console.log(`${approve.id} has been approved successfully`);
                        req.flash("success_msg", `${approve.id} has been approved successfully`)
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
                        await Product.findByIdAndDelete(id)
                        .then(async(declined) => {
                            if(!declined) {
                                return done(null, false, req.flash("error", `Could Not Decline ${declined.id}`))
                            } else {
                                console.log(`${declined.id} has been deleted`);
                                req.flash("success_msg", `${declined.id} has been deleted`);
                                res.redirect("/admin/all-vendors")
                            }
                        }).catch((err) => console.log(err));
                    } else {
                        console.log(`${declined.id} has been deleted`);
                        req.flash("success_msg", `${declined.id} has been deleted`);
                        res.redirect("/admin/all-vendors")
                    }
                }).catch(err => console.log(err))
            } else {
                console.log(`${declined.id} has been deleted`);
                req.flash("success_msg", `${declined.id} has been deleted`);
                res.redirect("/admin/all-farmers");
                return;
            }
        })
        .catch((err) => console.log(err));
    },
    categoryGet: async(req, res) => {
        await Category.find({ approved: true })
        .exec(async(err, categories) => {
            const pageTitle = "Categories";
            const name = req.user.name;
                    const email = req.user.email;
                    const avatar = req.user.avatar;
            res.render("adminViews/categories", { pageTitle , name, email, avatar, categories});
        })
    },
    addCategoryGet: (req, res) => {
        const pageTitle = "Add Category";
        const name = req.user.name;
                    const email = req.user.email;
                    const avatar = req.user.avatar;
        res.render("adminViews/add-category", { pageTitle, name, email, avatar })
    },
    addCategoryPost: async(req, res) => {
        const { name, typeOfCat } = req.body;
        console.log(req.body);
        if(!req.body) {
            res.render("adminViews/add-category", {
                pageTitle: "Categories",
                name, 
                typeOfCat
            })
        } else {
            await Category.findOne({ name: name})
            .then(async(category) => {
                if(category) {
                    console.log(`${category.name} already exists try another`);
                    req.flash(
                        "error",
                        `${category.name} already exists try another please`
                    )
                    res.redirect("/admin/add-category");
                } else {
                    const newCategory = new Category({
                        name,
                        typeOfCat
                    });
                    console.log(newCategory);
                    await newCategory.save()
                    .then((category) => {
                        console.log("New Category saved successfully");
                        req.flash(
                            "succes_msg",
                            `${category.name} saved successfully`
                        )
                        res.redirect("/admin/category")
                    })
                    .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
        }
    },
    all_productsGet: async(req, res) => {
        await Product.countDocuments({approved: false}, async(err, totalProducts) => {
            await Product.find({approved: false})
            .exec(async(err, products) => {
                await Product.find({approved: true})
                .exec(async(err, productsApproved) => {
                    const pageTitle = "All Products";
                    const name = req.user.name;
                    const email = req.user.email;
                    const avatar = req.user.avatar;
                    res.render("adminViews/all-products", { pageTitle, name, email, avatar, products, productsApproved, totalProducts })
                })
        })
        })
        // await Product.find({}).exec(async(err, falseProducts) => {
        //     console.log(falseProducts);
        //     const pageTitle = "All Products";
        //     const name = req.user.name;
        //     const email = req.user.email;
        //     const avatar = req.user.avatar;
        //     res.render("adminViews/all-products", { pageTitle, name, email, avatar, falseProducts })
        // })
    },
    all_approvedProductsGet: async(req, res) => {
        await Product.countDocuments({approved: true}, async(err, totalApproved) => {
            await Product.find({approved: true})
            .exec(async(err, productsApproved) => {
                const pageTitle = "All Products";
                const name = req.user.name;
                const email = req.user.email;
                const avatar = req.user.avatar;
                res.render("adminViews/approved-products", { pageTitle, name, email, avatar, productsApproved, totalApproved })
            })
        })
    }
}