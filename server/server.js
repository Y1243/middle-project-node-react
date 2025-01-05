require("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")

const app=express()
const PORT=process.env.PORT|| 1234
connectDB()

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/users",require("./routes/userRoute"))
app.use("/api/posts",require("./routes/postRoute"))
app.use("/api/todos",require("./routes/todoRoute"))

mongoose.connection.once('open',()=>{
    console.log("connected to db");
    app.listen(PORT,()=>{
        console.log(`server runinng on port ${PORT}`);
    })
})
mongoose.connection.on('error',(err)=>{
    console.log(err);
})
