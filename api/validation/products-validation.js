import Joi from "joi";

const createProductSchema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    productExtraInfo: Joi.string() // Stringified array of data
        .required(),
    imgAltText: Joi.string().trim().required(),
});

const postExtraInfoArraySchema = Joi.array()
    .items(
        Joi.object({
            size: Joi.number().integer().positive().required(),
            price: Joi.number().positive().precision(2).required(),
        }),
    )
    .min(1)
    .required();

const updateProductSchema = Joi.object({
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    category: Joi.string().trim(),
    productExtraInfo: Joi.string(), // Stringified array of data
    productImg: Joi.string(), // Possible 'null' str val
    imgAltText: Joi.string().trim(),
});

const patchExtraInfoArraySchema = Joi.array()
    .items(
        Joi.object({
            productExtraInfoId: Joi.number().integer().positive().required(),
            size: Joi.number().integer().positive(),
            price: Joi.number().positive().precision(2),
        }),
    )
    .min(1)
    .required();

export function postProductValidation(data) {
    return createProductSchema.validateAsync(data);
}

export function postProductExtraInfoValidation(data) {
    return postExtraInfoArraySchema.validateAsync(data);
}

export function patchProductValidation(data) {
    return updateProductSchema.validateAsync(data);
}

export function patchProductExtraInfoValidation(data) {
    return patchExtraInfoArraySchema.validateAsync(data);
}
