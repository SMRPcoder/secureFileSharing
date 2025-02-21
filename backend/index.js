const express=require("express");
const cors =require("cors");

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello World!",status:true});
})


app.listen(3000,()=>{
    console.log("server started with port 3000");
})