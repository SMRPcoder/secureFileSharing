const {Router}=require("express");
const authController=require("../controller/authController");
const AuthUser = require("../middleware/authUser");
const AuthRouter=Router();

AuthRouter.post("/register",authController.register);
AuthRouter.post("/login",authController.login);

AuthRouter.post("/adminLogin",authController.adminLogin);

// using middleware to check token in header
AuthRouter.get("/checkProtected",AuthUser,authController.checkProtected);

module.exports=AuthRouter;