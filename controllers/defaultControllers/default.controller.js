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
    shop: (req, res) => {
        const pageTitle = "Shop";
        res.render("defaultViews/shop", {pageTitle});
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
    }
}