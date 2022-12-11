const Joi = require('joi')

/**
 * schema Validator is used to validate the request object shape
 * coming from the frontend client
 * @param {Object} data -> This is the req object
 * @param {Object} schema -> This is the joi validaton schema
 * @returns Joi Validator Object 
 */ exports.schemaValidator = async (data, schema) => {
    try {
        let value = await schema.validateAsync(data)
        return {
            isValid: true,
            value
        }
    }
    catch (error) {
        Logger.notify(error);
            throw error
    }
}
