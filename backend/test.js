const { Client } = require("redis-om");

let REDIS_URL = "redis://default:kingsolomon1!@redis-10573.c10.us-east-1-4.ec2.cloud.redislabs.com:10573";

/* pulls the Redis URL from .env */
const url = REDIS_URL;

/* create and open the Redis OM Client */
const db = new Client();

db.open(url).then(()=> {
    console.log('Connected successfully to redis database');
}).catch(err => { 
    console.log(err)
})


const { Entity, Schema } = require("redis-om");

/* our entity */
class Certificate extends Entity { }


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


//check to make sure certificate id doesn't exist already
const certificateIdExists = async (email) => {
    const certificate = await certificateRepository.search()
    .where('email').eq(email).return.all()
    return (certificate.length) ? true : false
}

// search for certificate using certificateId
const searchCertificate = async (certificateId) => {
    const certificate = await certificateRepository.search()
    .where('certificateId').eq(certificateId).return.all()
    return JSON.stringify(certificate)
}

// get all certificates from database
const getCertificates = async () => {
    const certificate = await certificateRepository.search().return.all()
    return JSON.stringify(certificate)
}

// saveCertificateDataToDB() -> This method saves our data to the mongodb database
const saveCertificateDataToDB = async (data) => {
    try {
        let certificate = await certificateRepository.createAndSave(data)
        console.log(JSON.stringify(certificate))
    }
    catch (err) { throw new Error("An error occured while saving the record, please try again later") }
}

const getCertificate = async (certificateId) => {
    const certificate = await certificateRepository.search()
    .where('certificateId').eq(certificateId).return.all()
    if (certificate.length) {
        console.log(JSON.stringify(certificate))
    }
    else {
        throw Error("There's no certificate matching that record")
    }
}

// saveCertificateDataToDB(certificateObject)
// certificateIdExists('solomonmarvel@hotmail.com')
// searchCertificate('a576419e6c244efe87272c92a429bca3')
// getCertificates()
// getCertificate('a576419e6c244efe87272c92a429bca3')