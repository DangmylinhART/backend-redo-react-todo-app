const mongoose = require('mongoose')
const Workout = require('./WorkoutSchema')
const User = require('../users/User')

module.exports = {
    createWorkout: async (req, res) => {
        try {
            let newWorkout = new Workout({
                name: req.body.name,
                cal: req.body.cal
            })
            let savedWorkout = await newWorkout.save()
            let foundUser = await User.findById(req.body._id);
            foundUser.workouts.push(savedWorkout);
            await foundUser.save();
            res.json({ foundUser })
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }
    },

    getAllWorkouts: async (req, res) => {
        try {
            let AllUserWorkouts = await User
                .findById(req.params.id)
                .populate("Workouts", "Workout")
                .select("-password -__v") // exclude password and version
            res.send(AllUserWorkouts)
            res.json('check req body first')
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }
    },

    deleteWorkout: async (req, res) => {

        let userId = req.body.userId
        let workoutId = req.body.workoutId

        try {
            let foundUser = await User.findById(userId)
            let deleteWorkout = foundUser.workouts.filter(id => id.toString() !== workoutId)
            foundUser.workouts = deleteWorkout
            await foundUser.save()
            await Workout.findByIdAndDelete(workoutId)
            res.json({ foundUser, deleteWorkout })
            res.send(workoutId)
        }
        catch (e) { res.status(500).json({ message: e.message }) }
    },

    updateWorkout: async (req, res) => {
        try {
            let updateWorkout = await Workout.findByIdAndUpdate(
                req.params.id,
                { name: req.body.name },
                { cal: req.body.cal },
            )
            res.send(updateWorkout)
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }

    }
}