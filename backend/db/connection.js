const {Sequelize}=require("sequelize");

// postgresql=========================================
const db=new Sequelize({
    database:"sft",
    host:"localhost",
    dialect:"postgres",
    username:"postgres",
    port:5432,
    password:"root",
    logging:false
});

//mysql==============================
// const db=new Sequelize({
//     dialect:"mysql",
//     username:"root",
//     database:"sft",
//     host:"localhost",
//     port:3306,
//     password:"",
// });


module.exports=db;