'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
// const multer = require("multer");

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
 
// var upload = multer({ storage: storage })
mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log('Error al conectar a la db')
    }
    console.log('conexion a la bd establecida')
    app.listen(config.port, () => {
        console.log(`api rest corriendo en ${config.port}`)
    })
})