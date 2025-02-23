const {Router}=require("express");
const AuthUser = require("../middleware/authUser");
const contactController=require("../controller/contactsController");

const ContactRouter=Router();

ContactRouter.post("/add",AuthUser,contactController.addContact);
ContactRouter.get("/viewAll",AuthUser,contactController.viewAllContacts);

module.exports=ContactRouter;