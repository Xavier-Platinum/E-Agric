const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    cid: {
        type: String
    },
    approved: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
    },
    typeOfCat: {
        type: String
    },
    createdBy: {
        type: String,
    }, 
    createdOn: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
})

module.exports = {Category: mongoose.model("categories", categorySchema)};