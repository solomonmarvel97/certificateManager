const Joi = require('joi')

exports.createCertificateSchema = Joi.object().keys({
    name: Joi.string().min(3).lowercase().required(),
    email: Joi.string().lowercase().required().email(),
    track: Joi.string().min(3).lowercase().required(),
    startDate: Joi.string().min(3).lowercase().required(),
    endDate: Joi.string().min(3).lowercase().required(),
    programme: Joi.string().min(3).lowercase().required(),
    picture: Joi.string().min(3).lowercase(),
})