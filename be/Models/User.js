const express = require("express")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        tye: String,
        required: true
    }
})

module.exports = mongoose.Schema("User", userSchema)