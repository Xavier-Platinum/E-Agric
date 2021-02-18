const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsSchema = new Schema({
    pid: {
        type: String
    },
    name: {
        type: String
    },
    productImage: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer"
    },
    category: {
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Category"
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    approved: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number
    },
    product_status: {
        type: String
    },
    sold: {
        type: Number,
        default: 0
    },
    promo: String,
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    price: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    status: {
        type: Boolean,
        default: false
    },
    shipping: {
        // required: true,
        type: Boolean
    }
}, {timestamps: true});

module.exports = {Product: mongoose.model("products", productsSchema)};