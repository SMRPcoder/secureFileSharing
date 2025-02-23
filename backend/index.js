const express=require("express");
const cors =require("cors");
const db = require("./db/connection");
const AuthRouter = require("./router/authRouter");
const app=express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

db.authenticate().then(()=>{
    console.log("authenticated success!");
}).catch((error)=>{
    console.log(error);
});


db.sync({alter:true}).then(()=>{
    console.log("synced");
})

app.get("/",(req,res)=>{
    res.status(200).json({message:"Hello World!",status:true});
})

app.use("/auth",AuthRouter);


app.listen(3000,()=>{
    console.log("server started with port 3000");
})