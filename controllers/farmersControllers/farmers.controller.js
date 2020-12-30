const bcrypt = require("bcryptjs");
const { Farmer } = require("../../models/farmersModel/farmers.model");

module.exports = {
    farmersRegisterGet: (req, res) => {
        const pageTitle = "Register";
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
                    res.redirect(`/${originalUrl}`);
                    console.log(req.originalUrl);
                    req.flash(
                        "success_msg",
                        "Email already exists"
                    )
                } else {
                    const newFarmer = new Farmer({
                        name,
                        email,
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