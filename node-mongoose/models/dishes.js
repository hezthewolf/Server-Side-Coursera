const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})


const Dishes = mongoose.model('Dish', dishSchema)

module.exports = Dishes