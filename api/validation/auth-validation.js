import Joi from "joi";

// reusable base rules (without .required() hardcoded)
const emailRule = Joi.string().trim().email().max(100);
const passwordRule = Joi.string().trim().min(6).max(50);

const signupSchema = Joi.object({
    firstName: Joi.string().trim().max(50).required(),
    lastName: Joi.string().trim().max(50).required(),
    email: emailRule.required(),
    password: passwordRule.required(),
    adminPassword: Joi.string().trim(),
});

const loginSchema = Joi.object({
    email: emailRule.required(),
    password: passwordRule.required(),
});

const forgotPasswordSchema = Joi.object({
    email: emailRule.required(),
});

const resetPasswordSchema = Joi.object({
    tempId: Joi.string().required(),
    newPassword: passwordRule.required(),
});

export function signupValidation(data) {
    return signupSchema.validateAsync(data);
}

export function loginValidation(data) {
    return loginSchema.validateAsync(data);
}

export function forgotPasswordValidation(data) {
    return forgotPasswordSchema.validateAsync(data);
}

export function resetPasswordValidation(data) {
    return resetPasswordSchema.validateAsync(data);
}
