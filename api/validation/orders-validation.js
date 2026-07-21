import Joi from "joi";

const createPaymentIntentSchema = Joi.object({
    userData: Joi.object({
        street: Joi.string().trim().required(),
        city: Joi.string().trim().required(),
        state: Joi.string().length(2).required(),
        zip: Joi.string()
            .trim()
            .pattern(/^\d{5}$/)
            .required(),
    }).required(),
    items: Joi.array()
        .items(
            Joi.object({
                productId: Joi.number().integer().positive().required(),
                productExtraInfoId: Joi.number()
                    .integer()
                    .positive()
                    .required(),
                itemQuantity: Joi.number().integer().min(1).required(),
            }),
        )
        .min(1)
        .required(),
});

export function createPaymentIntentValidation(data) {
    return createPaymentIntentSchema.validateAsync(data);
}
