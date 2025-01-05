const express=require("express")
const router=express.Router()
const todoController=require("../controllers/todoController")

router.get("/",todoController.getAllTodos)
router.get("/:id",todoController.getTodoById)
router.post("/",todoController.createNewTodo)
router.put("/",todoController.updateTodo)
router.put("/:id",todoController.updateComplete)
router.delete("/:id",todoController.deleteTodo)

module.exports=router