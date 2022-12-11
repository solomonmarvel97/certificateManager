require('dotenv').config()
require('./src/config')
require('./src/database')
require('./src/helper')
const express = require('express')
const app = express()
const cors = require('cors')

// set express static path
app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const PORT = AppConfig.PORT

// cors options
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// import route
const { Router } = require('./src/packages/certificate/controller')
app.use(Router)

// Helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require("helmet");
app.use(helmet());

// local logging
// HTTP logging middleware
let fs = require('fs')
let path = require('path')
let morgan = require('morgan')

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

/* set up swagger in the root */
const swaggerDocument = YAML.load("./spec.yaml");
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// default error middleware -> You should remove this when debugging
app.use((err, req, res, next) => {
    Logger.notify(err) // Logging other errors using HoneyBadger;
    console.log(err)
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        error: err.message
    })
})

app.listen(PORT, () => {
    console.log(`App Launched 🚀 & listening on port ${PORT}`)
})