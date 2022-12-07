const Joi = require('joi')

exports.createCertificateSchema = Joi.object().keys({
    name: Joi.string().min(3).lowercase().required(),
    track: Joi.string().min(3).lowercase().required(),
    startDate: Joi.string().min(3).lowercase().required(),
    endDate: Joi.string().min(3).lowercase().required(),
    programme: Joi.string().min(3).lowercase().required(),
    picture: Joi.string().min(3).lowercase(),
})