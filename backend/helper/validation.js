const Joi = require('@hapi/joi')

const registerValidation = (user) => {
    const userSchema =Joi.object({
        name: Joi.string()
            .min(6)
            .max(255)
            .required(),
        email: Joi.string()
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required(),
        studentId: Joi.string()
            .length(8)
            .pattern(new RegExp('^[0-9]+$'))
    })
    validation = userSchema.validate(user,{abortEarly:false})
    if (validation.error){
        errorDetails = validation.error.details
        errorsMessagee = errorDetails.map(error=>error.message)
        return {
            error: errorsMessagee
        }
    }
    return {
        value: validation.value
    }
}

const loginValidation = (user) => {
    const userSchema =Joi.object({
        email: Joi.string()
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required()
    })
    validation = userSchema.validate(user,{abortEarly:false})
    if (validation.error){
        errorDetails = validation.error.details
        errorsMessagee = errorDetails.map(error=>error.message)
        return {
            error: errorsMessagee
        }
    }
    return {
        value: validation.value
    }
}

module.exports = {
    registerValidation,
    loginValidation
}