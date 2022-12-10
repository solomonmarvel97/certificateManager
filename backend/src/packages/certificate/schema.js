const Joi = require('joi')
const { db } = require("../../database")
const { Entity, Schema } = require("redis-om");
class Certificate extends Entity { } /* our entity */

// joi schema -> Create Certificate JSON Object
exports.createCertificateSchema = Joi.object().keys({
    name: Joi.string().min(3).lowercase().required(),
    email: Joi.string().lowercase().required().email(),
    track: Joi.string().min(3).lowercase().required(),
    startDate: Joi.string().min(3).lowercase().required(),
    endDate: Joi.string().min(3).lowercase().required(),
    programme: Joi.string().min(3).lowercase().required(),
    picture: Joi.string().min(3).lowercase(),
})

/* create a Schema for Person */
const certificateSchema = new Schema(Certificate, {
    certificateId: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
    track: { type: "string" },
    startDate: { type: "string" },
    endDate: { type: "string" },
    programme: { type: "string" },
    picture: { type: "string" },
    url: { type: "string" }
});

const certificateRepository = db.fetchRepository(certificateSchema);

certificateRepository.createIndex();

module.exports.certificateRepository = certificateRepository