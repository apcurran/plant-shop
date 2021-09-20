"use strict";

const Joi = require("joi");

function signupValidation(data) {
    const schema = Joi.object({
        firstName:      Joi
                            .string()
                            .max(50)
                            .required(),
        lastName:       Joi
                            .string()
                            .max(50)
                            .required(),
        email:          Joi
                            .string()
                            .email()
                            .max(100)
                            .required(),
        password:       Joi
                            .string()
                            .min(6)
                            .max(50)
                            .required(),
        adminPassword:   Joi
                            .string()
    });

    return schema.validateAsync(data);
}

function loginValidation(data) {
    const schema = Joi.object({
        email:     Joi
                    .string()
                    .email()
                    .max(100)
                    .required(),
        password:  Joi
                    .string()
                    .min(6)
                    .max(50)
                    .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    signupValidation,
    loginValidation
};