const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: { type: String, trim: true, required: true },
    
    // ref "Todo" from Todo Schema
    todos: [{ type: mongoose.Schema.ObjectId, ref: "Todo" }],
    meals: [{ type: mongoose.Schema.ObjectId, ref: "Meal" }],
    workouts: [{ type: mongoose.Schema.ObjectId, ref: "Workout" }],
})

module.exports = mongoose.model('User', UserSchema)
