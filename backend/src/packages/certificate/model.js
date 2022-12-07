const { v4 } = require('uuid')
const { db } = require('../../database')
const collection = db.collection('certificates');


/**
   * Certificate Model -> The Certificate Model is our primary business 
   * logic for generating and saving our certificates on the platform
   * GenerateCertificate()
   * GenerateUniqueID()
   * SaveCertificatetoDB()
*/
class Certificate {
    /**
     * Model Constructor
     *
     * @param {String} name
     * @param {String} track
     * @param {String} startDate
     * @param {String} endDate
     * @param {String} programme
     * @param {String} picture
    */
    #name
    #track
    #startDate
    #endDate
    #programme
    #picture

    constructor(name, track, startDate, endDate, programme, picture) {
        this.#name = name
        this.#track = track
        this.#startDate = startDate,
            this.#endDate = endDate,
            this.#programme = programme
        this.#picture = picture
    }

    // This method creates and save the certificate 
    async generate() {
        // generate certificate id
        let certificateId = this.#generateUniqueID()

        // check if certificate id already exists
        let result = await this.#certificateIdExists(certificateId)
        if (result) {
            throw Error('The certificate ID already exists')
        }

        // compose the certificate object
        let certificateObject = {
            certificateId: this.#generateUniqueID(),
            name: this.#name,
            track: this.#track,
            startDate: this.#startDate,
            endDate: this.#endDate,
            programme: this.#programme,
            picture: this.#picture,
        }

        // save certificate to mongodb
        this.#saveCertificateDataToDB(certificateObject)

        // attach certificate url to certificate object
        certificateObject.url = `http://localhost:3001/uploads/certificates/${certificateObject.certificateId}.pdf`

        // generate certificate pdf and url
        await certificateGenerator(certificateObject.certificateId)

        return certificateObject
    }

    //check to make sure certificate id doesn't exist already
    async #certificateIdExists(certificateId) {
        return await collection.findOne({ "certificateId": certificateId })
            .then(data => {
                if (data) {
                    return true
                } else {
                    return false
                }
            })
    }

    // search for certificate using id
    static async searchCertificate(id) {
        let result = collection.findOne({certificateId: id})
        return result
    }

    // get all certificates from database
    static async getCertificates() {
        let result = collection.find()
        return result        
    }

    /**
     * generate() -> This method creates and save the certificate 
     * by calling the saveCertificateToDB method
    */
    #generateUniqueID() {
        return v4().replaceAll('-', '')
    }

    /**
     * saveCertificateDataToDB() -> This method saves our data to the mongodb database
    */
    async #saveCertificateDataToDB(data) {
        try {
            let { certificateId } = data.certificateId
            // save our record to mongodb
            const insertResult = await collection.insertOne(data);
        }
        catch (err) { throw new Error(err) }
    }
}

module.exports.Certificate = Certificate