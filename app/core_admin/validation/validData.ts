import * as Joi from 'joi'
export const validData = {
    alphaNum: Joi.string().regex(/^[a-zA-Z0-9, ]*$/, 'Alphanumerics, space and comma characters').min(3).max(30),
    number: Joi.number().required(),
    Date: Joi.date().raw().required(),
    comments: Joi.string().min(30).max(1500).required(),
    email: Joi.string().email().required(),
    mobile : Joi.string().regex(/^[0-9]{10}$/).required(),
    birth_year: Joi.number() .integer() .min(1900) .max(2013)
}