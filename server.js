const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/db-config') // MongoDB Config
const Note = require('./models/Note') // Mongoose collection schema
const homeRoutes = require('./routes/home')
const todosRoutes = require('./routes/todos')
require('dotenv').config({path: './config/.env'})

connectDB()

// Set Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Set Routes

app.use('/',homeRoutes)
app.use('/todos',todosRoutes)

// Start Server

app.listen(process.env.PORT, (res,req) =>{
    console.log(`Server is now listening in PORT ${process.env.PORT}`)
})