const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin", "farmer", "vendor", "user"]
    },
    phone: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = {Admin: mongoose.model("admin", adminSchema)}