const {Router}=require("express");
const adminController=require("../controller/adminController");
const AuthAdmin = require("../middleware/authAdmin");
const AdminRouter=Router();

AdminRouter.get("/viewAllusers",AuthAdmin,adminController.viewAllUsers);
AdminRouter.get("/viewAllfiles",AuthAdmin,adminController.viewAllFiles);

module.exports=AdminRouter;