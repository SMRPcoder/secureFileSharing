const {Sequelize}=require("sequelize");

const db=new Sequelize({
    dialect:"mysql",
    username:"root",
    database:"sft",
    host:"localhost",
    port:3306,
    password:"",
    // logging:false
});



module.exports=db;