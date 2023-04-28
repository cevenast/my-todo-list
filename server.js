const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
///////   These help us have logged in users
const session = require('express-session') // Leaves a cookie in our user's computer that matches the session stored in our DB
const MongoStore = require('connect-mongo')(session)
///////
const flash = require('express-flash') //  Helps with the messages that flash up to notify that something went wrong
const logger = require('morgan') // Shows us our log for every request.
///////
const connectDB = require('./config/db-config') // MongoDB Config, connection to our DB
const homeRoutes = require('./routes/home')
const todosRoutes = require('./routes/todos')
//.env
require('dotenv').config({path: './config/.env'}) //These functions are run immediately

// Passport config
require('./config/passport')(passport)

connectDB()

// Set Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev')) // Setting up morgan to run and log everything

// Sessions
app.use( // Letting our upp use the session
    session({
      secret: 'keyboard cat', // It can be changed
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize()) // Passport's gonna handle our authentication
app.use(passport.session())    // We're gonna be using session along with passport

app.use(flash())               // Setting the flash alerts that show up when thing go wrong with log in and sign up


// Routes Set Up

app.use('/',homeRoutes)
app.use('/todos',todosRoutes)

// Start Server

app.listen(process.env.PORT, (res,req) =>{
    console.log(`Server is now listening in PORT ${process.env.PORT}`)
})