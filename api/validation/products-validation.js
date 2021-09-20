"use strict";

const Joi = require("joi");

function postProductValidation(data) {
    const schema = Joi.object({
        title:            Joi
                            .string()
                            .required(),
        description:      Joi
                            .string()
                            .required(),
        category:         Joi
                            .string()
                            .required(),
        productExtraInfo: Joi
                            .string() // Stringified array of data
                            .required(),
        imgAltText:       Joi
                            .string()
                            .required()
    });

    return schema.validateAsync(data);
}

function patchProductValidation(data) {
    const schema = Joi.object({
        title:            Joi
                            .string(),
        description:      Joi
                            .string(),
        category:         Joi
                            .string(),
        productExtraInfo: Joi
                            .string(), // Stringified array of data
        productImg:       Joi
                            .string(), // Possible 'null' str val
        imgAltText:       Joi
                            .string()
    });

    return schema.validateAsync(data);
}

module.exports = {
    postProductValidation,
    patchProductValidation
};