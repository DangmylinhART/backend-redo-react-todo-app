var express = require('express');
var router = express.Router();
const jwtChecker = require('../utils/jwtChecker')
const { createWorkout
    // , getAllUserWorkouts, deleteWorkout, updateWorkout 
} = require('./WorkoutController')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// router.post('/create-Workout', jwtChecker, createWorkout)
router.post('/create-Workout', createWorkout)

// router.get('/get-user-all-Workout/:id', jwtChecker, getAllUserWorkouts)

// router.delete('/delete-Workout', jwtChecker, deleteWorkout)

// router.put('/update-Workout', jwtChecker, updateWorkout)


module.exports = router;
