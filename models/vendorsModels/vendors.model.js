const mongoose = require("mongoose");
const {Schema} = mongoose;

const vendorsSchema = new Schema({
    vid: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        // required: true
    },
    avatar: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String,
        default: "vendor",
        enum: ["admin", "farmer", "vendor", "user"]
    },
    password: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    transactionId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = {Vendor: mongoose.model("vendor", vendorsSchema)};