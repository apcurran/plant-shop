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
        adminPassword:  Joi
                            .string()
                            .trim()
    });

    return schema.validateAsync(data);
}

function loginValidation(data) {
    const schema = Joi.object({
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
                            .required()
    });

    return schema.validateAsync(data);
}

function forgotPasswordValidation(data) {
    const schema = Joi.object({
        email:          Joi
                            .string()
                            .trim()
                            .email()
                            .max(100)
                            .required()
    });

    return schema.validateAsync(data);
}

function resetPasswordValidation(data) {
    const schema = Joi.object({
        tempId:         Joi
                            .string()
                            .required(),
        newPassword:    Joi
                            .string()
                            .trim()
                            .min(6)
                            .max(50)
                            .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    signupValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation
};