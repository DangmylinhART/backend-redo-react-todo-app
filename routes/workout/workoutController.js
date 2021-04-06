const mongoose = require('mongoose')
const Workout = require('./WorkoutSchema')
const User = require('../users/User')

// test some tetz here
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

    // getAllUserWorkouts: async (req, res) => {

    //     console.log('line34')
    //     console.log('query', req.query)
    //     console.log(req)

    //     try {
    //         // let AllUserWorkouts = await User
    //         //     .findById(req.params.id)
    //         //     .populate("Workouts", "Workout")
    //         //     .select("-password -__v") // exclude password and version
    //         // res.send(AllUserWorkouts)
    //     }
    //     catch (e) {
    //         console.log('line45')
    //         res.status(500).json({ message: e.message })
    //     }
    // },

    // deleteWorkout: async (req, res) => {

    //     let userId = req.body.userId
    //     let WorkoutId = req.body.WorkoutId
    //     try {
    //         // let foundUser = await User.findById(userId)
    //         // let foundUserArray = foundUser.Workouts
    //         // let filteredArray = foundUserArray.filter((id) => {
    //         //     if (id.toString() !== WorkoutId) { return id }
    //         // })

    //         // foundUser.Workouts = filteredArray

    //         // await foundUser.save()
    //         // await Workout.findByIdAndDelete(WorkoutId)

    //         // // return the id of the deleted Workout
    //         // res.send(WorkoutId)

    //     }
    //     catch (e) { res.status(500).json({ message: e.message }) }
    // },

    // updateWorkout: async (req, res) => {

    //     try {
    //         // let updateWorkout = await Workout.findByIdAndUpdate(
    //         //     req.body.WorkoutId,
    //         //     { Workout: req.body.newWorkoutValue },
    //         //     { new: true })
    //         // res.send(updateWorkout)
    //     }
    //     catch (e) {
    //         res.status(500).json({ message: e.message })
    //     }

    // }
}