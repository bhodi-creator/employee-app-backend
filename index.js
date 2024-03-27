const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./Routes/user.routes")
const {postRouter}=require("./Routes/employee.routes")
const cors=require("cors")

const app=express()

app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"This is the Home page"})
})

app.use("/users",userRouter)

  app.use("/employee",postRouter)

// app.use("/oder",oderRouter)




const PORT=process.env.Port

app.listen(PORT,async()=>{
    try{
         await connection
         console.log("Server is connected to Db")
         console.log(`Server is running at ${PORT}`)
    }catch(err){
        console.log(err)
    }
})