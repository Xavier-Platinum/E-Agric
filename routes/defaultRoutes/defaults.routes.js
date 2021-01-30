// const express = require("express");
// const router = express.Router();
const router = require("express").Router();

// Destructooring controllers
const { index, about, our_products, farming_practice, shop, news, news_details, contact, profile, place_order, add_to_cart } = require("../../controllers/defaultControllers/default.controller");

// Home Route
router.get("/", index);

// About route
router.get("/about", about);

// Our-products route
router.get("/our-product", our_products);

// farming-practice route
router.get("/farming-practice", farming_practice);


// shop route
router.get("/shop", shop, add_to_cart);

// news route 
router.get("/news", news);

// news-details route
router.get("/news-details", news_details);

// contact route
router.get("/contact", contact);

// cart get


// add to cart
router.get("/add-to-cart", add_to_cart);

// Profile Route
router.get("/profile", profile);

module.exports = router;