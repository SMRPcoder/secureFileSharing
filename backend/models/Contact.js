const { UUIDV4,DataTypes } = require("sequelize");
const db=require("../db/connection");
const User = require("./User");

const Contact=db.define("contacts",{
    id:{
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        allowNull:false
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false
    },
    contactPersonId:{
        type:DataTypes.UUID,
        allowNull:false
    }
},{timestamps:true});


Contact.belongsTo(User,{foreignKey:"userId",as:"user"});
User.hasMany(Contact,{foreignKey:"userId",as:"user"});

Contact.belongsTo(User,{foreignKey:"contactPersonId",as:"contact"});
User.hasMany(Contact,{foreignKey:"contactPersonId",as:"contact"});

module.exports=Contact;