const User = require("../models/User")

const createNewUser = async (req, res) => {
    const { name, userName, email, address, phone } = req.body
    if (!userName) {
        return res.status(400).send('userName is required')
    }
    const user = await User.create({ name, userName, email, address, phone })
    if (user)
        return getAllUser(req,res)
    return res.status(400).send('user not created')
}

const getAllUser = async (req, res) => {
    const users = await User.find().lean()
    if (!users?.length)
        return res.status(400).send("dont found users")
    return res.json(users)
}

const getUserById=async (req,res)=>{
    const {id}=req.params
    const user=await User.findById(id).lean()
    if(!user){
        return res.status(400).send("This user no found")
    }
    res.json(user)
}
const updateUser=async (req,res)=>{
    const { id,name, userName, email, address, phone } = req.body
    if(!id || !userName){
        return res.status(400).send("id and userName is requried")
    }
    const user=await User.findById(id).exec()
    if(!user){
        return res.status(400).send("Dont have this user")
    }
    user.name=name
    user.userName=userName
    user.email=email
    user.address=address
    user.phone=phone
    const updatedUser=await user.save()
    
    return getAllUser(req,res)

}

const deleteUser=async (req,res)=>{
    const {id}=req.params
    const user=await User.findById(id).exec()
if(!user){
    return res.status(400).send("the user not found")
}
const result=await user.deleteOne()
return res.json(await User.find().lean())

}

module.exports = { createNewUser ,getAllUser,getUserById,updateUser,deleteUser}