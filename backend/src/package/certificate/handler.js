const fs = require('fs');
const Router = require('express').Router()
const {Certificate} = require('./model')


Router.post("/create", async (req,res) => {
    // perform validation using joi or zod
    const {name, track, startDate, endDate, programme, picture} = req.body
    let certificate = new Certificate(name, track, startDate ,endDate, programme, picture)
    let result = await certificate.generate()
    res.json(result)
})

// Where fileName is name of the file and res is Node.js Reponse. 
Router.get("/certificate/:certificateId", async (req, res) => {
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

module.exports = {Router}