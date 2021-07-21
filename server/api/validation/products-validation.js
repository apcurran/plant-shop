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
        productExtraInfo: Joi // Bug TODO: will add without an array present in req.body field
                            .array()
                            .items(
                                Joi.object({
                                    size: Joi.number().required(),
                                    price: Joi.number().required()
                                })
                            )
                            .required(),
        imgAltText:       Joi
                            .string()
                            .required(),
        imgWidth:         Joi
                            .number()
                            .required(),
        imgHeight:        Joi
                            .number()
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
        productExtraInfo: Joi // Bug TODO: will add without an array present in req.body field
                            .array()
                            .items(
                                Joi.object({
                                    size: Joi.number().required(),
                                    price: Joi.number().required()
                                })
                            ),
        imgAltText:       Joi
                            .string(),
        imgWidth:         Joi
                            .number(),
        imgHeight:        Joi
                            .number()
    });

    return schema.validateAsync(data);
}

module.exports = {
    postProductValidation,
    patchProductValidation
};