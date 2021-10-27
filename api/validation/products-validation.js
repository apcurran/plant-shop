"use strict";

const Joi = require("joi");

function postProductValidation(data) {
    const schema = Joi.object({
        title:            Joi
                            .string()
                            .trim()
                            .required(),
        description:      Joi
                            .string()
                            .trim()
                            .required(),
        category:         Joi
                            .string()
                            .trim()
                            .required(),
        productExtraInfo: Joi
                            .string() // Stringified array of data
                            .required(),
        imgAltText:       Joi
                            .string()
                            .trim()
                            .required()
    });

    return schema.validateAsync(data);
}

function patchProductValidation(data) {
    const schema = Joi.object({
        title:            Joi
                            .string()
                            .trim(),
        description:      Joi
                            .string()
                            .trim(),
        category:         Joi
                            .string()
                            .trim(),
        productExtraInfo: Joi
                            .string(), // Stringified array of data
        productImg:       Joi
                            .string(), // Possible 'null' str val
        imgAltText:       Joi
                            .string()
                            .trim()
    });

    return schema.validateAsync(data);
}

module.exports = {
    postProductValidation,
    patchProductValidation
};