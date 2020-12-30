const bcrypt = require("bcryptjs");
const { Vendor } = require("../../models/vendorsModels/vendors.model");

module.exports = {
    vendorIndex: (req, res) => {
        const pageTitle = "Dashboard";
        res.render("vendorsViews/index", { pageTitle });
    },
    vendorRegistrationGet: (req, res) => {
        const pageTitle = "Vendor Register";
        res.render("auth/vendorsRegister", { pageTitle});
    },
    vendorRegistrationPost: async(req, res) => {
        const { name, email, password, cPassword } = req.body;
        console.log(req.body);
        const errors = [];

        // checking for required fields
        if(!name || !email || !password || !cPassword ) {
            errors.push({ msg: "Please fill in all fields" });
        }

        // Matching password
        if(password != cPassword) {
            errors.push({ msg: "Password do not match"});
        }

        // Checkking password lenght
        if(password.lenght < 4 ) {
            errors.push({ msg: "Password should be at least 6 charaacters" })
        }

        if(errors.length > 0) {
            res.render("auth/vendorsRegister", {
                errors, 
                pageTitle: "Register",
                name, 
                email,
                password,
                cPassword
            })
        } else {
            // validation passed
            await Vendor.findOne({ email: email })
            .then( async(vendor) => {
                if(vendor) {
                    // user exists
                                        // errors.push({ msg: "Email is already registered" });

                    // res.render("auth/register", {
                    //     errors,
                    //     pageTitle: "Register",
                    //     name,
                    //     email,
                    //     phone,
                    //     password,
                    //     cPassword
                    // });
                    console.log("Email already exists");
                    res.redirect(`/${originalUrl}`);
                    console.log(`/${originalUrl}`);
                    req.flash(
                        "success_msg",
                        "This Email already exists"
                    )
                } else {
                    const newVendor = new Vendor ({
                        name,
                        email,
                        password
                    })
                    console.log(newVendor);
                    // req.flash({})

                    // Hashing password
                    bcrypt.genSalt(10, async(err, salt) => 
                        bcrypt.hash(newVendor.password, salt, async(err, hash) => {
                            if(err) throw err;
                            // set password to hashed
                            newVendor.password = hash;
                            // saving vendor
                            await newVendor.save()
                            .then((vendor) => {
                                console.log(`New Vendor Saved successfully ${vendor}`);
                                req.flash(
                                    "success_msg",
                                    `You can now login ${vendor.email}`
                                )
                                res.redirect("/auth/login");
                                console.log(`Logging in vendor ${vendor.email}`);
                            })
                            .catch(err => console.log(err)); 
                        })
                    )
                }
            })
        }
    }
}