const { Product } = require("../../models/products/products.model");
const randomString =  require("randomstring");
const cloudinary = require("../../config/cloudinary");

module.exports = {
    product_post: async(req, res) => {
        const { name, category, promo, description, price } = req.body;
        const productImage = req.file;
        let errors = [];

        console.log("Consoling ::::::::::", req.body, req.file);
        if(!productImage || !name) {
            errors.push({msg: "All are required fileds"});
            req.flash("error_msg", "Cannot proceed");
            res.redirect("/farmer/add-product");
        } else {
            await cloudinary.v2.uploader.upload(
                req.file.path,
                async (err, result) => {
                    if(!result) {
                        req.flash("error_msg", "Image Upload Failed");
                        res.redirect("/farmer/add-product");
                        console.log("Image upload failed");
                    } else {
                        const id = randomString.generate({length: 5, charset: "alphanumeric"});
                        const pid = `PID-${id}`;
                        const newProduct = new Product({
                            pid,
                            name,
                            category,
                            promo,
                            description,
                            price,
                            productImage: await result.secure_url,
                        });
                        await newProduct.save();
                        console.log("Saved", newProduct);
                        req.flash("success_msg", "Product added successfully");
                        res.redirect("/farmer/all-products");
                    }
                }
            )
        }
    }
}