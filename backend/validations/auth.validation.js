const joi = require("joi");

exports.RegisterValidator = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().optional(),
    username: joi.string().email().required(),
    password: joi.string().min(8).max(36).required()
});

exports.LoginValidator = joi.object({
    username: joi.string().email().required(),
    password: joi.string().required()
});