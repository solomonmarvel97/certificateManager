const fs = require('fs');
const Router = require('express').Router()
const { Certificate } = require('./model');
const { createCertificateSchema } = require('./schema');


Router.get("/certificates", async (req, res) => {
    try {
        let result = await Certificate.getCertificates()
        result.toArray(function(err, items) {
            res.json(items)
        });
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

// generate certificate
Router.post("/create", async (req, res) => {
    // perform validation using joi
    try {
        let validator = await schemaValidator(req.body, createCertificateSchema)
        if (!validator.isValid) {
            throw validator.error
        }

        const { name, track, startDate, endDate, programme, picture } = req.body
        console.log(req.body)
        let certificate = new Certificate(name, track, startDate, endDate, programme, picture)
        let result = await certificate.generate()

        result.status = "ok"
        result.message = "Certificate Generated Successfully"
        res.json(result)
    }
    catch (err) {
        console.log(err)
        res.status(422).json({
            error: err.message
        })
    }
})

// Download certificate
Router.get("/certificate/download/:certificateId", async (req, res) => {
    // or any file format
    const filePath = `${AppConfig.BaseDirectory}/uploads/certificates/pdf/${req.params.certificateId}.pdf`;

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
Router.get("/certificate/:certificateId", async (req, res) => {
    // or any file format
    const filePath = `${AppConfig.BaseDirectory}/uploads/certificates/pdf/${req.params.certificateId}.pdf`;

    // Check if file specified by the filePath exists
    fs.exists(filePath, function (exists) {
        if (exists) {
            var data = fs.readFileSync(filePath);
            res.contentType("application/pdf");
            res.send(data);
        }
    });
})

module.exports = { Router }