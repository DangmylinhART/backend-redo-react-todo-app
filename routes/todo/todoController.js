const mongoose = require('mongoose')
const Todo = require('./TodoModel')
const User = require('../users/User')


module.exports = {
    createTodo: async (req, res) => {
        try {
            let newTodo = new Todo({ todo: req.body.todo })
            let savedTodo = await newTodo.save()
            let foundUser = await User.findById(req.body._id);
            console.log('line1', foundUser)
            foundUser.todos.push(savedTodo);
            await foundUser.save();
            res.json({ savedTodo })
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }
    },

    getAllUserTodos: async (req, res) => {

        console.log('line34')
        console.log('query', req.query)

        try {
            let AllUserTodos = await User
                .findById(req.params.id)
                .populate("todos", "todo")
                .select("-password -__v") // exclude password and version
            res.send(AllUserTodos)
        }
        catch (e) {
            console.log('line45')
            res.status(500).json({ message: e.message })
        }
    },

    deleteTodo: async (req, res) => {

        let userId = req.body.userId
        let todoId = req.body.todoId
        try {
            let foundUser = await User.findById(userId)
            let foundUserArray = foundUser.todos
            let filteredArray = foundUserArray.filter((id) => {
                if (id.toString() !== todoId) { return id }
            })

            foundUser.todos = filteredArray

            await foundUser.save()
            await Todo.findByIdAndDelete(todoId)

            // return the id of the deleted todo
            res.send(todoId)

        }
        catch (e) { res.status(500).json({ message: e.message }) }
    },

    updateTodo: async (req, res) => {

        try {
            let updateTodo = await Todo.findByIdAndUpdate(
                req.body.todoId,
                { todo: req.body.newTodoValue },
                { new: true })
            res.send(updateTodo)
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }

    }
}