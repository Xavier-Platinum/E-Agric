// const mongo uri 
const MONGO_URI =  process.env.MONGO_URI_LOCAL || "mongodb://localhost/E-Agro";

const { Admin } = require("../models/adminModels/admin.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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

const admin = new Admin({
    name: "Kwis Lawrence Francis",
    email: "kwislawrencekwis@gmail.com",
    phone: 08163252713,
    password: "abcd1234",
    role: "admin",
    avatar: "undefined"
})

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(admin.password, salt, (err, hash) => {
    if (err) {
        throw err;
    }
    admin.password = hash;
    admin
        .save()
        .then(() => {
            console.log("admin save successfully");
        })
        .catch((err) => {
            console.log(err);
        });
    });
});  