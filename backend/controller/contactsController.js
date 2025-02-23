const { request, response } = require("express");
const User = require("../models/User");
const Contact = require("../models/Contact");




exports.addContact = async (req = request, res = response) => {
    try {
        const { contactPersonId } = req.body;
        const userData = await User.findOne({ where: { id: contactPersonId } });
        if (userData) {
            const newContactData = { userId: req.userId, contactPersonId };
            await Contact.create(newContactData);
            res.status(201).json({ message: "created successfully!", status: true });
        } else {
            res.status(400).json({ message: "Invalid Contact!", status: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}

exports.viewAllContacts = async (req, res) => {
    try {
        const contactsData = await Contact.findAll({
            where: { userId: req.userId },
            include: [
                { model: User, foreignKey: "contactPersonId" },
            ]
        });
        res.status(200).json({ data: contactsData, status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Happend!", status: false });
    }
}