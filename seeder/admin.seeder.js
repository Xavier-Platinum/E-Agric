// const mongo uri 
const MONGO_URI =  process.env.MONGO_URI_LOCAL || "mongodb://localhost/E-Agro";

const { Admin } = require("../models/adminModels/admin.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
// const cloudinary = require("../config/cl")

// connecting mongoDB
mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB Connected Successfully:::");
})
.catch((err) => {
    console.log(err);
})

const admin = ({
    name: "Admin@e-agric",
    email: "admin@e-agric.com",
    phone: 08163252713,
    password: "abcd1234",
    role: "admin"
})

const avatar = gravatar.url(admin.email, {
    s: "200", //size
    r: "pg", //rating
    d: "mm" //default 
})

const newAdmin = new Admin({
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    password: admin.password,
    role: admin.role,
    avatar: avatar
})

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
    if (err) {
        throw err;
    }
    newAdmin.password = hash;
    newAdmin
        .save()
        .then(() => {
            console.log("admin save successfully", newAdmin);
        })
        .catch((err) => {
            console.log(err);
        });
    });
});  