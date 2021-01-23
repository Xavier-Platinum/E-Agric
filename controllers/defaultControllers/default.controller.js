const { Product } = require("../../models/products/products.model");
const { Order, CartItem } = require("../../models/orders/order.model");
module.exports = {
    index: (req, res) => {
        const pageTitle = "Home";
        res.render("defaultViews/index", {pageTitle});
    },
    about: (req, res) => {
        const pageTitle = "About";
        res.render("defaultViews/about", {pageTitle});
    },
    our_products: (req, res) => {
        const pageTitle = "Our Products";
        res.render("defaultViews/our-products", {pageTitle});
    },
    farming_practice: (req, res) => {
        const pageTitle = "Farming Practice";
        res.render("defaultViews/farming-practice", {pageTitle});
    },
    shop: async(req, res) => {
        await Product.find({approved: true}, async(err, products) => {
            const pageTitle = "Shop";
        res.render("defaultViews/shop", {pageTitle, products});
        })
    },
    news: (req, res) => {
        const pageTitle = "News";
        res.render("defaultViews/news", {pageTitle});
    },
    news_details: (req, res) => {
        const pageTitle = "News Details";
        res.render("defaultViews/news-details", {pageTitle});
    },
    contact: (req, res) => {
        const pageTitle = "Contact";
        res.render("defaultViews/contact", {pageTitle});
    },
    profile: async (req, res) => {
        console.log(req.user.role);
        if(req.user.role === "admin") {
            await res.redirect("/admin");
        } else if (req.user.role === "vendor") {
            await res.redirect("/vendor");
        } else if (req.user.role === "farmer") {
            await res.redirect("/farmer");
        } else if (req.user.role === "user") {
            await res.redirect("/user");
        } else {
            await req.flash("error", `User Not Found`);
            alert("Sorry User Not found, Please Try Again");
        }
    },
    place_order: async(req, res, next, id) => {
        console.log("You hit me!!!!!!")
        Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if(err || !order) {
                return res.status(400).json({
                    error: "could not add to cart"
                })
            }
        })
    }
}