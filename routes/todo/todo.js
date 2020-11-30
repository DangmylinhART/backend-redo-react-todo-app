var express = require('express');
var router = express.Router();
const jwtChecker = require('../utils/jwtChecker')
const { createTodo, getAllUserTodos, deleteTodo, updateTodo } = require('./todoController')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/create-todo', jwtChecker, createTodo)
// // way 1 use query
// router.get('/get-user-all-todo', getAllUserTodos)
// way 2 user params. params is the part after the /
router.get('/get-user-all-todo/:id', jwtChecker, getAllUserTodos)

// //way 1: using 2 params
// router.delete('/delete-todo/:userId/:todoId', deleteTodo)
//way 2: using 2 body
router.delete('/delete-todo', jwtChecker, deleteTodo)

router.put('/update-todo', jwtChecker, updateTodo)


module.exports = router;
