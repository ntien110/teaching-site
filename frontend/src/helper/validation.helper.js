const Joi = require('@hapi/joi')


const registerValidation = (user) => {
    const userSchema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(255)
            .required(),
        email: Joi.string()
            .max(255)
            .required()
            .email({ tlds: {allow: false} }),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required(),
        studentId: Joi.string()
            .length(8)
            .pattern(new RegExp('^[0-9]+$'))
    })
    
    let validation = userSchema.validate(user, { abortEarly: false })
    if (validation.error) {
        let errorDetails = validation.error.details
        let errorsMessagee = errorDetails.map(error => error.message)
        return {
            error: errorsMessagee,
            details: errorDetails
        }
    }
    return {
        value: validation.value
    }
}

const loginValidation = (user) => {
    const userSchema = Joi.object({
        email: Joi.string()
            .max(255)
            .required()
            .email({ tlds: {allow: false} }),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required()
    })
    let validation = userSchema.validate(user, { abortEarly: false })
    if (validation.error) {
        let errorDetails = validation.error.details
        let errorsMessagee = errorDetails.map(error => error.message)
        return {
            error: errorsMessagee,
            details: errorDetails
        }
    }
    return {
        value: validation.value
    }
}


const createSubjectValidation = (subject) => {
    const subjectSchema = Joi.object({
        name: Joi.string()
            .min(1)
            .max(255)
            .required(),
        description: Joi.string()
            .max(1024)
            .allow(''),
        image: Joi.optional()
    })
    
    let validation = subjectSchema.validate(subject, { abortEarly: false })
    if (validation.error) {
        let errorDetails = validation.error.details
        let errorsMessagee = errorDetails.map(error => error.message)
        return {
            error: errorsMessagee,
            details: errorDetails
        }
    }
    return {
        value: validation.value
    }
}

export {
    registerValidation,
    loginValidation,
    createSubjectValidation
}