const mongoose = require("mongoose");
const {Schema} = mongoose;

const farmersSchema = new Schema({
    fid: {
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
        default: "farmer",
        enum: ["admin", "farmer", "vendor"]
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

module.exports = {Farmer: mongoose.model("farmers", farmersSchema)};