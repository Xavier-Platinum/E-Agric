const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const randomString = require("randomstring");
const { Farmer } = require("../../models/farmersModel/farmers.model");

module.exports = {
    farmersIndex: (req, res) => {
        const pageTitle = "Farmer";
        const name = req.user.name;
        const email = req.user.email;
        const avatar = req.user.avatar;
        res.render("farmersViews/index", { pageTitle, name, email, avatar });
    },
    farmersRegisterGet: (req, res) => {
        const pageTitle = "Farmers Registration";
        res.render("auth/farmersRegister", { pageTitle });
    },
    farmersRegisterPost: async (req, res) => {
        const { name, email, password, cPassword} = req.body;
        console.log("Got" + req.body + "as response from the form");
        let errors = [];

        // checkking for required fields
        if(!name || !email || !password || !cPassword) {
            errors.push({ msg: "Please fill in all fields" });
        }

        // Matching password
        if(password != cPassword) {
            errors.push({ msg: "Passwords do not match" });
        }

        // Checkking password length
        if(password.length < 4 ) {
            errors.push({ msg: "Password should be at least 6 characters" });
        }

        if(errors.length > 0) {
            res.render("auth/farmersRegister", {
                errors,
                pageTitle: "Register",
                name, 
                email,
                password,
                cPassword
            })
        } else {
            // Validation  passed
            await Farmer.findOne({ email: email })
            .then( async(farmer) => {
                if(farmer) {
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
                    res.redirect(`/farmer/register`);
                    console.log(req.originalUrl);
                    req.flash(
                        "error_msg",
                        "Email already exists"
                    )
                } else {
                    const avatar = gravatar.url(req.body.email, {
                        s: "200", //size
                        r: "pg", //rating
                        d: "mm" //default
                    })
                    const newFarmer = new Farmer({
                        name,
                        email,
                        avatar,
                        password
                    });
                    console.log(newFarmer);
                    // req.flash({ })

                    // Hashing password
                    bcrypt.genSalt(10, async(err, salt) => 
                        bcrypt.hash(newFarmer.password, salt, async(err, hash) => {
                            if(err)  throw err;
                            // Set password to hashed
                            newFarmer.password = hash;
                            // Saving farmer
                            await newFarmer.save()
                            .then((farmer) => {
                                console.log(`New famer saved successfully ${farmer}`);
                                req.flash(
                                    "success_msg",
                                    `You can now login ${farmer.email}`
                                )
                                res.redirect("/auth/login");
                                console.log(`You can now login ${farmer.email}`);
                            })
                            .catch(err => console.log(err));
                    }))
                }
            })
        }
    }
}