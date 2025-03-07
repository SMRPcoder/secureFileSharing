const { request, response } = require("express");
const User = require("../models/User");
const { Op } = require("sequelize");
const { faker } = require("@faker-js/faker");


exports.showUserList = async (req, res) => {
    try {
        console.log(req.userId);
        const UserListData = await User.findAll({ where: { isActive: true, id: { [Op.ne]: req.userId } }, attributes: ["id", "username"],raw:true });
        // console.log(UserListData);
        res.status(200).json({ data: UserListData, status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.seeder = async (req, res) => {
    let NewUsersData=[];
    for(let i = 100; i>0; i--) {
        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();
        let UserData = {
            firstName,
            lastName,
            username: faker.internet.email({ firstName, lastName }),
            password: "123456789"
        };
        console.log("in");
        NewUsersData.push(UserData);
    }
    await User.bulkCreate(NewUsersData);
    res.status(200).json({message:"Seeeder Success",status:false});
}