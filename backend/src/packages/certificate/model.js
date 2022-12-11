require('../../config')
const { v4 } = require('uuid')
const puppeteer = require('puppeteer');
const Repository = require('./repository')

/**
* Certificate Model -> Primary Model for our certificate package 
* used for constructing and saving our certificates on the platform
*/
class Certificate {
    #name
    #email
    #track
    #startDate
    #endDate
    #programme
    #picture
    
    /**
    * @param {String} name
    * @param {String} email 
    * @param {String} track
    * @param {String} startDate
    * @param {String} endDate
    * @param {String} programme
    * @param {String} picture
    */
    constructor(name, email, track, startDate, endDate, programme, picture) {
        this.#name = name
        this.#email = email
        this.#track = track
        this.#startDate = startDate
        this.#endDate = endDate
        this.#programme = programme
        this.#picture = picture
    }

    /**
     * This method creates and save the certificate 
     * @returns {Object} Returns a javascript Object
     */
    async generate() {
        // generate certificate id
        let certificateId = generateUniqueID()
        // check if certificate id already exists
        let result = await this.#certificateIdExists(this.#email)
        if (result) {
            throw Error('The certificate with this email already exists')
        }
        // compose the certificate object
        let certificateObject = {
            certificateId,
            name: this.#name,
            email: this.#email,
            track: this.#track,
            startDate: this.#startDate,
            endDate: this.#endDate,
            programme: this.#programme,
            picture: this.#picture,
        }
        // attach certificate url to certificate object
        certificateObject.url = `${AppConfig.HOST}/assets/certificates/${certificateId}.pdf`

        // save certificate to mongodb
        await this.#saveCertificateDataToDB(certificateObject)

        // generate certificate pdf and url
        await this.#certificateToPDF(certificateId)

        return certificateObject
    }


    /**
     * check to make sure certificate id doesn't exist already
     * @param {String} certificateId 
     * @returns {Object}
     */
    async #certificateIdExists(email) {
        return await Repository.certificateIdExists(email)
    }

    /**
     * getCertificates()
     * get all certificates from database
     * @returns {Object} Returns a certificate Object
     */
    static async getAllCertificates() {
        return await Repository.getAllCertificates()
    }

    /**
     * getCertificates()
     * searches for a certificate in our database using the certificateId
     * @returns {Object} Returns a certificate object
     */
    static async searchCertificate(certificateId) {
        return await Repository.searchCertificate(certificateId)
    }

    /**
     * saveCertificateDataToDB()
     * This method saves our data to the mongodb database
     * @param {Object} data 
     * @returns {Object} Returns a certificate Object
     */
    async #saveCertificateDataToDB(data) {
        return await Repository.saveCertificateDataToDB(data)
    }

    /**
     * @param {String} certificateId 
     * @returns {String} -> Returns an href string url
     */
    #certificateToPDF = async (certificateId) => {
        // Create a browser instance
        const browser = await puppeteer.launch({ args: ['--ignore-certificate-errors'] });
        // Create a new page
        const page = await browser.newPage();
        // Website URL to export as pdf
        const certificateUrl = new URL(`${AppConfig.HOST}/generate?certificateId=${certificateId}`);
        // Open URL in current page
        await page.goto(certificateUrl.href, { waitUntil: 'networkidle0' });
        //To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');
        // Downlaod the PDF
        await page.pdf({
            path: `${AppConfig.BaseDirectory}/uploads/certificates/${certificateId}.pdf`,
            margin: { top: '50px', right: '20px', bottom: '50px', left: '20px' },
            printBackground: true,
            format: 'A4',
            landscape: true,
        });
        // Close the browser instance
        await browser.close();
        return certificateUrl.href
    }
}

module.exports.CertificateModel = Certificate