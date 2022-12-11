const { schemaValidator } = require("./validator");
const {logger} = require('./logger')
global.schemaValidator = schemaValidator
global.Logger = logger
global.generateUniqueID = () => {
    return require('uuid').v4().replaceAll('-', '')
}