require('dotenv').config()
require('./src/database')
require('./src/config')
require('./src/helper')

const express = require('express')
const app = express()
const cors = require('cors')

// set express static path
app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');
const port = 3001

// cors options
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// for parsing multipart/form-data
// var multer = require('multer');
// var upload = multer();
// app.use(upload.array());

// using formidable for multipart-form upload

app.get('/certificate', async (req, res) => {
    const { db } = require('./src/database')
    const collection = db.collection('certificates');
    let queryResut = await collection.findOne({ "certificateId": req.query['certificateId'] })
    res.render('pages/index', queryResut);
})

// import route
const { Router } = require('./src/packages/certificate/handler')
app.use(Router)



  app.use((err,req,res,next)=> {
    err.statusCode= err.statusCode || 500
    err.status= err.status || 'error'
    res.status(err.statusCode).json({
         status:err.status,
         error: err.message
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})