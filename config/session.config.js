//Importamos session, connect-mongo y mongoose

const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')


module.exports = (app) =>{
    app.use( //app.use
        session({
        secret:process.env.SECRET,
        resave: true,
        saveUninitialized: false,
        cookie:{
            httpOnly: true,
            maxAge: 60000
        },
        sotre: MongoStore.create({
            //url de mi base de datos
            mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/subastes"
        })
    })
    )//end app.use
}