const express=require("express")
const router=express.Router()
const postController=require("../controllers/postController")

router.get("/",postController.getAllPost)
router.get("/:id",postController.getPostById)
router.post("/",postController.createNewPost)
router.put("/",postController.updatePost)
router.delete("/:id",postController.deletePost)

module.exports=router