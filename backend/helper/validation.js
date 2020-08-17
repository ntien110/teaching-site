const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const registerValidation = (user) => {
    const userSchema =Joi.object({
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
            .email({ tlds: {allow: false} }),
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

const creatingSubjectValidation = (subject) => {
    const subjectSchema =Joi.object({
        name: Joi.string()
            .min(1)
            .max(255)
            .required(),
        imageId: Joi.objectId(),
        description: Joi.string()
            .max(1024)
    })
    validation = subjectSchema.validate(subject,{abortEarly:false})
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

const objectIdValidation = (id) => {
    const objectIdSchema =Joi.object({
        id: Joi.objectId()
    })
    validation = objectIdSchema.validate({id},{abortEarly:false})
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
    loginValidation,
    creatingSubjectValidation,
    objectIdValidation
}