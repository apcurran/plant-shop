"use strict";

const Joi = require("joi");

function signupValidation(data) {
    const schema = Joi.object({
        firstName:      Joi
                            .string()
                            .max(50)
                            .trim()
                            .required(),
        lastName:       Joi
                            .string()
                            .max(50)
                            .trim()
                            .required(),
        email:          Joi
                            .string()
                            .email()
                            .max(100)
                            .trim()
                            .required(),
        password:       Joi
                            .string()
                            .min(6)
                            .max(50)
                            .trim()
                            .required(),
        adminPassword:   Joi
                            .string()
                            .trim()
    });

    return schema.validateAsync(data);
}

function loginValidation(data) {
    const schema = Joi.object({
        email:     Joi
                    .string()
                    .email()
                    .max(100)
                    .trim()
                    .required(),
        password:  Joi
                    .string()
                    .min(6)
                    .max(50)
                    .trim()
                    .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    signupValidation,
    loginValidation
};