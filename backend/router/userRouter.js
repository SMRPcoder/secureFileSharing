const {Router}=require("express");
const AuthUser = require("../middleware/authUser");
const userController=require("../controller/userController");

const userRouter=Router();

userRouter.get("/list",AuthUser,userController.showUserList);
userRouter.get("/seed",userController.seeder);

module.exports=userRouter;