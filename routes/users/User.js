const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
    },
    todos: [{ type: mongoose.Schema.ObjectId, ref: "Todo" }],
})

module.exports = mongoose.model('User', UserSchema)