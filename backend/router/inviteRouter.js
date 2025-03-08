const {Router}=require("express");
const AuthUser = require("../middleware/authUser");
const inviteController=require("../controller/invitesController");

const InviteRouter=Router();

InviteRouter.post("/sent",AuthUser,inviteController.sentInvite);
InviteRouter.get("/viewAll",AuthUser,inviteController.viewAllInvite);
InviteRouter.delete("/delete/:id",AuthUser,inviteController.deleteInvite);
InviteRouter.post("/reject",AuthUser,inviteController.rejectInvite);



module.exports=InviteRouter;