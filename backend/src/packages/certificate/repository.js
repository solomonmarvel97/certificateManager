const {certificateRepository} = require('./schema')

//check to make sure certificate id doesn't exist already
exports.certificateIdExists = async (email) => {
    const certificate = await certificateRepository.search()
    .where('email').eq(email).return.all()
    return (certificate.length) ? true : false
}

// search for certificate using certificateId
exports.searchCertificate = async (certificateId) => {
    const certificate = await certificateRepository.search()
    .where('certificateId').eq(certificateId).return.all()
    return certificate[0]
}

// get all certificates from database
exports.getCertificates = async () => {
    const certificate = await certificateRepository.search().return.all()
    return certificate
}

// saveCertificateDataToDB() -> This method saves our data to the mongodb database
exports.saveCertificateDataToDB = async (data) => {
    try {
        let certificate = await certificateRepository.createAndSave(data)
        return certificate[0]
    }
    catch (err) { throw new Error("An error occured while saving the record, please try again later") }
}

exports.getCertificate = async (certificateId) => {
    const certificate = await certificateRepository.search()
    .where('certificateId').eq(certificateId).return.all()
    if (certificate.length) {
        return JSON.stringify(certificate[0])
    }
    else {
        throw Error("There's no certificate matching that record")
    }
}