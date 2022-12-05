const { certificateGenerator } = require("./certificateGenerator");
const { schemaValidator } = require("./validator");

global.certificateGenerator = certificateGenerator
global.schemaValidator = schemaValidator