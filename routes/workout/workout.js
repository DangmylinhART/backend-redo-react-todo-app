var express = require('express');
var router = express.Router();
const jwtChecker = require('../utils/jwtChecker')
const {
    createWorkout,
    getAllWorkouts,
    deleteWorkout,
    updateWorkout
} = require('./WorkoutController')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
// router.post('/create-Workout', jwtChecker, createWorkout)
router.post('/create-workout', createWorkout)

router.get('/get-all-workouts/:id', getAllWorkouts)

router.delete('/delete-Workout', deleteWorkout)

router.put('/update-Workout/:id', updateWorkout)


module.exports = router;
