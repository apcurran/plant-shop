import Joi from "joi";

const createProductSchema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    productExtraInfo: Joi.string() // Stringified array of data
        .required(),
    imgAltText: Joi.string().trim().required(),
});

const updateProductSchema = Joi.object({
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    category: Joi.string().trim(),
    productExtraInfo: Joi.string(), // Stringified array of data
    productImg: Joi.string(), // Possible 'null' str val
    imgAltText: Joi.string().trim(),
});

export function postProductValidation(data) {
    return createProductSchema.validateAsync(data);
}

export function patchProductValidation(data) {
    return updateProductSchema.validateAsync(data);
}
