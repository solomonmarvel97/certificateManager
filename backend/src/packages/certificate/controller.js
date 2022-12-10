const fs = require('fs');
const { upload } = require('../../middleware/upload/local');
const Router = require('express').Router()
const { Certificate } = require('./model');
const { createCertificateSchema } = require('./schema');


Router.get('/certificate', async (req, res) => {
    let queryResut = await Certificate.getCertificate(req.query['certificateId'])
    res.render('pages/index', JSON.parse(queryResut));
})

// search certificate with certificate id
Router.get("/certificate/search/:id", async (req, res) => {
    try {
        let certificateId = req.params['id']
        // get's a null string if the param wasn't passed
        if (certificateId === "null") {
            throw Error('certificate id was not passed')
        }
        let result = await Certificate.searchCertificate(certificateId)
        res.status(200).json(result)
    } catch (err) {
        Honeybadger.notify(err);
        res.status(404).json({
            error: err.message
        })
    }
})

// Get all certificates
Router.get("/certificates", async (req, res) => {
    try {
        let result = await Certificate.getCertificates()
        res.json(result)
    }
    catch (err) {
        Honeybadger.notify(err);
        res.status(500).json({
            error: err.message
        })
    }
})

// generate certificate
Router.post("/certificate", upload, async (req, res) => {
    try {
        // parse multipart-form data
        let requestBody = JSON.parse(req.body.form)
        // perform validation using joi
        await schemaValidator(requestBody, createCertificateSchema)
        // componse file path
        const picture = (req.files[0]?.path !== undefined) ? `${AppConfig.HOST}/${req.files[0]?.path}` : null
        const { name, email, track, programme, startDate, endDate } = requestBody
        let certificate = new Certificate(name, email, track, startDate, endDate, programme, picture)
        let data = await certificate.generate()
        res.status(200).json({
            status: "ok",
            message: "Certificate Generated Successfully",
            ...data
        })
    }
    catch (err) {
        Honeybadger.notify(err);
        res.status(422).json({
            error: err.message
        })
    }
})

// Download certificate
Router.get("/certificate/download/:certificateId", async (req, res) => {
    // or any file format
    const filePath = `${AppConfig.BaseDirectory}/uploads/certificates/${req.params.certificateId}`;
    // Check if file specified by the filePath exists
    fs.exists(filePath, function (exists) {
        if (exists) {
            // Content-type is very interesting part that guarantee that
            // Web browser will handle res in an appropriate manner.
            res.writeHead(200, {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=" + filePath
            });
            fs.createReadStream(filePath).pipe(res);
            return;
        }
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("ERROR File does not exist");
    });
})

// Render certificate
Router.get("/uploads/:type/:file", async (req, res) => {
    // or any file format
    let filePath = ""
    filePath = `${AppConfig.BaseDirectory}/uploads/${req.params.type}/${req.params.file}`;
    fs.exists(filePath, function (exists) {
        if (exists) {
            var data = fs.readFileSync(filePath);
            (req.params.type == "certificates") ? res.contentType("application/pdf") : res.contentType("image/png");
            res.send(data);
        }
    });
})

module.exports = { Router }