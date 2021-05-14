const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const validator = require("validator");



// Creating the schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3

    },

    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid emmail id")
            }
        }

    },
    password: {
        type: String,
        required: true,


    },

    phone: {
        type: String,
        required: true,
        min: 10

    },

    message: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now,

    }

})





//  Creating  a new collections 
const User = new mongoose.model("User", userSchema);

module.exports = User;