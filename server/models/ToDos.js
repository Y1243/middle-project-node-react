const mongoose = require("mongoose")
const todosSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    tags: {
        type: [String]
    },
    complete:{
        type: Boolean,
        default:false
    }

},{
    timestamps:true
}
)
module.exports=mongoose.model('Todo',todosSchema)