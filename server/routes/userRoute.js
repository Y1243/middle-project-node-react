const express=require("express")
const router=express.Router()
const User=require("../models/User")
const userController=require("../controllers/userController")

router.post("/",userController.createNewUser)
router.get("/:id",userController.getUserById)
router.get("/",userController.getAllUser)
router.put("/",userController.updateUser)
router.delete("/:id",userController.deleteUser)

module.exports=router