const bcrypt = require("bcryptjs");
const { User } = require("../../models/usersModels/users.model");

module.exports = {
    userIndex: (req, res) => {
        const pageTitle = "User";
        res.render("usersViews/index", { pageTitle });
    },
    userRegistrationGet: (req, res) => {
        const pageTitle = "Users Registration";
        res.render("auth/usersRegister", { pageTitle});
    },
    userRegistrationPost: async(req, res) => {
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
            res.render("auth/usersRegister", {
                errors, 
                pageTitle: "Register",
                name, 
                email,
                password,
                cPassword
            })
        } else {
            // validation passed
            await User.findOne({ email: email })
            .then( async(user) => {
                if(user) {
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
                    const newUser = new User ({
                        name,
                        email,
                        password
                    })
                    console.log(newUser);
                    // req.flash({})

                    // Hashing password
                    bcrypt.genSalt(10, async(err, salt) => 
                        bcrypt.hash(newUser.password, salt, async(err, hash) => {
                            if(err) throw err;
                            // set password to hashed
                            newUser.password = hash;
                            // saving UsernewUser
                            await newUser.save()
                            .then((user) => {
                                console.log(`New User Saved successfully ${user}`);
                                req.flash(
                                    "success_msg",
                                    `You can now login ${user.email}`
                                )
                                res.redirect("/auth/login");
                                console.log(`Logging in user ${user.email}`);
                            })
                            .catch(err => console.log(err)); 
                        })
                    )
                }
            })
        }
    }
}