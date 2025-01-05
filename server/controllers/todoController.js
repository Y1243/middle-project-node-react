const Todo = require("../models/ToDos")

const createNewTodo = async (req, res) => {
    const { title, tags } = req.body
    if (!title) {
        return res.status(400).send('title is required')
    }
    const todo = await Todo.create({ title, tags })
    if (todo)
        return getAllTodos(req,res)
    return res.status(400).send('Todo not created')
}

const getAllTodos = async (req, res) => {
    const todos = await Todo.find().lean()
    if (!todos?.length)
        return res.status(400).send("dont found todos")
    res.json(todos)
}

const getTodoById = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id).lean()
    if (!todo) {
        return res.status(400).send("This todo no found")
    }
    res.json(todo)
}
const updateTodo = async (req, res) => {
    const { id, title, tags ,complete} = req.body
    if (!id || !title) {
        return res.status(400).send("id and title is requried")
    }
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(400).send("Dont have this todo")
    }
    console.log(tags);
    todo.title = title
    todo.tags = tags
    todo.complete=complete
    const updatedTodo = await todo.save()
    return getAllTodos(req,res)
}
const updateComplete=async (req,res)=>{
    const {id}=req.params
    const todo=await Todo.findById(id).exec()
    if(!todo){
        res.status(400).send("Didn't find todo")
    }
    todo.complete=!todo.complete
    const updatedTodo=await todo.save()
    return getAllTodos(req,res)
}

const deleteTodo = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(400).send("the todo not found")
    }
    const result = await todo.deleteOne()
    res.json(await Todo.find().lean())
}

module.exports = { createNewTodo, getAllTodos, getTodoById, updateTodo, deleteTodo,updateComplete }