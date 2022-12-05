require('dotenv').config()
require('./src/database')
require('./src/config')
require('./src/helper')

const express = require('express')
const formidable = require('express-formidable')
const app = express()
const cors = require('cors')
// set the view engine to ejs

app.set('view engine', 'ejs');
const port = 3001

app.use(express.json())

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// app.use(express.urlencoded({ extended: true }))
// app.use(formidable())

app.get('/certificate', async (req, res) => {
    const { db } = require('./src/database')
    const collection = db.collection('certificates');
    let queryResut = await collection.findOne({ "certificateId": req.query['certificateId'] })
    res.render('pages/index', queryResut);
})

// import route
const {Router} = require('./src/package/certificate/handler')
app.use(Router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  