// import express route functions
const { createCertificate, searchCertificate, downloadCertificate, getAllCertificates, renderAssets, generatePDF } = require('./controller')
// upload middleware
const { upload } = require('../../middleware/upload/local');
// express router
const CertificateRouter = require('express').Router()

CertificateRouter.post("/certificate", upload, createCertificate)
CertificateRouter.get("/certificate/search/:id", searchCertificate)
CertificateRouter.get("/certificate/download/:certificateId", downloadCertificate)
CertificateRouter.get("/certificates", getAllCertificates)
CertificateRouter.get("/assets/:type/:file", renderAssets)
CertificateRouter.get('/generate', generatePDF)

module.exports.Router = CertificateRouter