require('dotenv').config()
require('./database')
require('./config')

const express = require('express')
const formidable = require('express-formidable')
const app = express()
// set the view engine to ejs

app.set('view engine', 'ejs');
const port = 3000

app.use(express.json())

// app.use(express.urlencoded({ extended: true }))
// app.use(formidable())

app.get('/certificate', async (req, res) => {
    const { db } = require('../src/database')
    const collection = db.collection('certificates');
    let queryResut = await collection.findOne({ "certificateId": req.query['certificateId'] })
    res.render('pages/index', queryResut);
})

// import route
const {Router} = require('./package/certificate/handler')
app.use(Router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  