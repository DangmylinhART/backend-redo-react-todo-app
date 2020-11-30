const mongoose = require('mongoose')
const Todo = require('./TodoModel')
const User = require('../users/User')


module.exports = {
    createTodo: async (req, res) => {
        try {
            let newTodo = new Todo({ todo: req.body.todo })
            let savedTodo = await newTodo.save()
            let foundUser = await User.findById(req.body._id);
            // let foundUser = await User.findById('5fb69e400874d15033039a67');
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

                // //way 1 use query
                //     .findById(req.query.userID)
                //way 2 use params.id
                .findById(req.params.id)
                .populate("todos", "todo")
                .select("-password -__v") // exclude password and version
            res.send(AllUserTodos)
            // res.json({ AllUserTodos })
        }
        catch (e) {
            console.log('line45')
            res.status(500).json({ message: e.message })
        }
    },

    deleteTodo: async (req, res) => {
        //     //way1
        //     let userId = req.params.userId
        //     let todoId = req.params.todoId
        //     try {
        //         let foundUser = await User.findById(userId)
        //         let foundUserArray = foundUser.todos
        //         let filteredArray = foundUserArray.filter((id) => {
        //             if (id.toString() !== todoId) { return id }
        //         })

        //         foundUser.todos = filteredArray

        //         await foundUser.save()
        //         await Todo.findByIdAndDelete(req.params.todoId)
        //         let deleteTodo = await Todo.findById(req.params.todoId)

        //         res.json({ userId, todoId, foundUserArray, filteredArray, deleteTodo })

        //     }
        //     catch (e) { res.status(500).json({ message: e.message }) }
        // }
        //way 2
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
        
        // let userId = req.body.userId
        // let todoId = req.body.todoId
        // try {
        //     foundUser = await User.findById(userId)
        //     console.log('foundUser', foundUser)
        //     foundUserArray = await foundUser.todos
        //     console.log('foundUserArray', foundUserArray)
        //     // let filteredArray = foundUserArray.filter((item) => {
        //     //     if (id.toString() === todoId) { return id }
        //     // })
        //     updateTodo = await Todo.findById(todoId)

        //     res.status(200)
        //         // .send(
        //         //     'this is from edit todo howabout found User Arry',
        //         //     foundUserArray,
        //         //     foundUser
        //         // )

        //         .json({
        //             message: 'this is from edit todo',
        //             foundUserArray: foundUserArray,
        //             foundUser: foundUser,
        //             updateTodo: updateTodo
        //         })



        // }
        // catch (e) {
        //     res.send(e)
        // }

    }
}