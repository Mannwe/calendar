'use strict'

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registered: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema)