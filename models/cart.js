const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Farmer",
        // required: true
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                // required: true
            },
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

module.exports = {Cart: mongoose.model("Carts", cartSchema)};