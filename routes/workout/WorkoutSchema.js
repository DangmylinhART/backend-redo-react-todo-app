const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    cal: {type: Number, trim: true, required: true}
})

module.exports = mongoose.model('Workout', workoutSchema)

