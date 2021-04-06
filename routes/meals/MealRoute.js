var express = require('express');
var router = express.Router();
const jwtChecker = require('../utils/jwtChecker')
const { createTodo, getAllUserTodos, deleteTodo, updateTodo } = require('./todoController')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/create-todo', jwtChecker, createTodo)

router.get('/get-user-all-todo/:id', jwtChecker, getAllUserTodos)

router.delete('/delete-todo', jwtChecker, deleteTodo)

router.put('/update-todo', jwtChecker, updateTodo)


module.exports = router;
