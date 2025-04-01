const {Router}=require("express");
const AuthUser = require("../middleware/authUser");
const userController=require("../controller/userController");
const upload = require("../middleware/multer-upload");

const userRouter=Router();

userRouter.get("/list",AuthUser,userController.showUserList);
userRouter.get("/seed",userController.seeder);

userRouter.post("/uploadFile",AuthUser,upload.single("file"),userController.sendFile);
userRouter.get("/viewAllFiles/:contactId",AuthUser,userController.viewAllForContact);

userRouter.get("/downloadFile/:id",AuthUser,userController.getFileForDownload);
userRouter.delete("/deleteFile/:id",AuthUser,userController.deleteFile);

module.exports=userRouter;