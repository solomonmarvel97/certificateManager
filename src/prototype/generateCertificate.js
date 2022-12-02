const { UUID } = require('bson')
const { v4 } = require('uuid')
const { db } = require('../database')
const { generateDownloadableCertificateLink } = require('../helper')

class Certificate {
    constructor(name, track, startDate, endDate, programme, picture) {
        this.name = name
        this.track = track
        this.startDate = startDate,
        this.endDate = endDate,
        this.programme = programme
        this.picture = picture
    }

    async generate() {
        let url = await generateDownloadableCertificateLink()

        let certificateObject = {
            certificateId: v4().replaceAll('-', ''),
            name: this.name,
            track: this.track,
            starDate: this.startDate,
            endDate: this.endDate,
            programme: this.programme,
            picture: this.picture,
            certificateUrl: url
        }
        this.saveCertificateDataToDB(certificateObject)
    }


    generateUniqueID() {
        const rs = require('randomstring')
        return rs.generate(20)
    }


    async saveCertificateDataToDB(data) {
        try {
            let { certificateId } = data.certificateId
            const collection = db.collection('certificates');

            //check to make sure certificate id doesn't exist already
            await collection.findOne({ "certificateId": certificateId })
                .then(data => {
                    if (data) {
                        return console.log('already exists')
                    }
                })

            // save our record to mongodb
            const insertResult = await collection.insertOne(data);
            console.log('Inserted documents =>', insertResult);
        }
        catch (err) { throw new Error(err) }
    }
}

let mockData = {
    name: "Marvelous Akporowho",
    track: "Frontend Engineering",
    startDate: "1st Dec, 2021",
    endDate: "1st Dec, 2022",
    programme: "cohort2.0",
    picture: 'https://avatars.dicebear.com/api/adventurer/marvelous%20akporowho.svg',
}

let certificate = new Certificate(mockData.name, mockData.track, mockData.startDate, mockData.endDate, mockData.programme, mockData.picture)
certificate.generate()