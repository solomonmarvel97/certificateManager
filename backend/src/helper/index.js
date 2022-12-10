const { schemaValidator } = require("./validator");
global.schemaValidator = schemaValidator

global.generateUniqueID = () => {
    return require('uuid').v4().replaceAll('-', '')
}