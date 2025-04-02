const express=require("express");
const cors =require("cors");
const db = require("./db/connection");
const AuthRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const InviteRouter = require("./router/inviteRouter");
const ContactRouter = require("./router/contactRouter");
const path=require("path");
const AdminRouter = require("./router/adminRoutes");
const app=express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

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
});


app.use("/auth",AuthRouter);
app.use("/user",userRouter);
app.use("/invites",InviteRouter);
app.use("/contacts",ContactRouter);
app.use("/admin",AdminRouter);


app.listen(3000,()=>{
    console.log("server started with port 3000");
})