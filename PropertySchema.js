const mongoose = require('mongoose')

const property = new mongoose.Schema({
    userId: String,
    value: String,
    image: String,
    available: String,
    unit: String,
    title: String,
    description: String,
    address: String
}, { timestamps: true })
module.exports = new mongoose.model('properties', property)