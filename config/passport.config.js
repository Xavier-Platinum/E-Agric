const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models/adminModels/admin.model");
const { Vendor } = require("../models/vendorsModels/vendors.model");
const { Farmer } = require("../models/farmersModel/farmers.model");
const { User } = require("../models/usersModels/users.model");

module.exports = (passport) => {
    passport.use(new localStrategy ({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async(req, email, password, done) => {
        // Matching
        await Admin.findOne({email: email}).then((user) => {
            if(!user) {
                await Vendor.findOne({email: email}).then((user) => {
                    if(!user) {
                        await Farmer.findOne({email: email}).then((user) => {
                            if (!user) {
                                await User.findOne({email: email}).then((user) => {
                                    if (!user) {
                                        return done(null, false, req.flash("error", `No user Found With this Email ${user.email}`))
                                    }

                                    // comparing hashed password
                                    bcrypt.compare(password, user.password, (err, passwordMatched) => {
                                        if (err) {
                                            return err;
                                        }

                                        if (!passwordMatched) {
                                            return done(null, false, req.flash("error", `Incalid Password Match, Please try again`))
                                        }

                                        return done(null, user, req.flash("success_msg", `${user.email} logged in successfully`));
                                    })
                                })
                                .catch((err) => console.log(err));
                            }

                            // comparing hashed password
                            bcrypt.compare(password, user.password, (err, passwordMatched) => {
                                if (err) {
                                    return err;
                                }

                                if (!passwordMatched) {
                                    return done(null, false, req.flash("error", `Incalid Password Match, Please try again`))
                                }

                                return done(null, user, req.flash("success_msg", `${user.email} logged in successfully`));
                            })
                        })
                        .catch((err) => console.log(err));
                    }

                    // comparing hashed password
                    bcrypt.compare(password, user.password, (err, passwordMatched) => {
                        if (err) {
                            return err;
                        }

                        if (!passwordMatched) {
                            return done(null, false, req.flash("error", `Incalid Password Match, Please try again`))
                        }

                        return done(null, user, req.flash("success_msg", `${user.email} logged in successfully`));
                    })
                })
                .catch((err) => console.log(err));
            }

            // comparing hashed password
            bcrypt.compare(password, user.password, (err, passwordMatched) => {
                if (err) {
                    return err;
                }

                if (!passwordMatched) {
                    return done(null, false, req.flash("error", `Incalid Password Match, Please try again`))
                }

                return done(null, user, req.flash("success_msg", `${user.email} logged in successfully`));
            })
        })
        .catch((err) => console.log(err));
    }));

    // Serializing and deserializing User
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async(id, done) => {
        await Admin.findById(id, async(err, user) => {
            if(!user) {
                await Vendor.findById(id, async(err, user) => {
                    if(!user) {
                        await Farmer.findById(id, async(err, user) => {
                            if(!user) {
                                await User.findById(id, async(err, user) => {
                                    await done(err, user);
                                })
                            } else {
                                await done(err, user);
                            }
                        })
                    }
                })
            }
        })
    })
}