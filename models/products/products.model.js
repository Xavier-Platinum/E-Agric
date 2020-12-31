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
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    promo: String,
    description: String,
    price: {
        type: String,
        required: true
    }
})

module.exports = {Product: mongoose.model("products", productsSchema)};