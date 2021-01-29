const mongoose = require("mongoose");
const {Schema} = mongoose;

const usersSchema = new Schema({
    uid: {
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
        default: "user",
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

module.exports = {User: mongoose.model("user", usersSchema)};