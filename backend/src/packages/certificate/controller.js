const fs = require('fs');
const { CertificateModel } = require('./model');
const { createCertificateSchema } = require('./schema');

// Create New Certificate
const createCertificate = async (req, res) => {
    try {
        // parse multipart-form data
        let requestBody = JSON.parse(req.body.form)
        // perform validation using joi
        await schemaValidator(requestBody, createCertificateSchema)
        // componse file path
        const picture = (req.files[0]?.path !== undefined) ? `${AppConfig.HOST}/${req.files[0]?.path.replace("uploads", "assets")}` : null
        const { name, email, track, programme, startDate, endDate } = requestBody
        let newCertificate = new CertificateModel(name, email, track, startDate, endDate, programme, picture)
        let data = await newCertificate.generate()
        res.status(200).json({
            status: "ok",
            message: "Certificate Generated Successfully",
            ...data
        })
    }
    catch (err) {
        Logger.notify(err);
        res.status(422).json({
            error: err.message
        })
    }
}

// Search Certificate with CertificateId
const searchCertificate = async (req, res) => {
    try {
        let certificateId = req.params['id']
        // get's a null string if the param wasn't passed
        if (certificateId === "null") {
            throw Error('certificate id was not passed')
        }
        let result = await CertificateModel.searchCertificate(certificateId)
        res.status(200).json(result)
    } catch (err) {
        Logger.notify(err);
        res.status(404).json({
            error: err.message
        })
    }
}

// Download Certificate
const downloadCertificate = async (req, res) => {
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
}

// Get All Certificates
const getAllCertificates = async (req, res) => {
    try {
        let result = await CertificateModel.getAllCertificates()
        res.json(result)
    }
    catch (err) {
        Logger.notify(err);
        res.status(500).json({
            error: err.message
        })
    }
}

// Render Assets
const renderAssets = async (req, res) => {
    // or any file format
    let filePath = `${AppConfig.BaseDirectory}/uploads/${req.params.type}/${req.params.file}`;
    fs.exists(filePath, function (exists) {
        if (exists) {
            let data = fs.readFileSync(filePath);
            (req.params.type == "certificates") ? res.contentType("application/pdf") : res.contentType("image/png");
            res.send(data);
        }
    });
}

// Used Internally For Generating Certificate PDF
const generatePDF = async (req, res) => {
    try {
        let certificateId = req.query['certificateId']
        // get's a null string if the param wasn't passed
        if (certificateId === "null") {
            throw Error('certificate id was not passed')
        }
        let queryResut = await CertificateModel.searchCertificate(certificateId)
        res.render('pages/index', queryResut);
    } catch (err) {
        res.status(404).json({
            error: err.message
        })
    }
}

module.exports = { 
    createCertificate,
    searchCertificate,
    downloadCertificate,
    getAllCertificates,
    renderAssets,
    generatePDF
}