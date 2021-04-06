const mongoose = require('mongoose')

const MealSchema = new mongoose.Schema({
    mealType: { type: String, trim: true, required: true },
    food: [{ type: mongoose.Schema.ObjectId, ref: 'Food' }]
})

module.exports = mongoose.model('Meal', MealSchema)

