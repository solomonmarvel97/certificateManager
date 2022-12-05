const Joi = require('joi')

// joi schema validator
exports.schemaValidator = async (data, schema) => {
    try {
        let value = await schema.validateAsync(data)
        return{
            isValid : true,
            value
        }
    }
    catch (error) {
       return {
        isValid: false,
        error
       }
    }
}