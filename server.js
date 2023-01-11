const express = require('express')
const app = express()
const mongoose = require('mongoose')
///////
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
///////
const connectDB = require('./config/db-config') // MongoDB Config
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
app.use(logger('dev'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())


// Set Routes

app.use('/',homeRoutes)
app.use('/todos',todosRoutes)

// Start Server

app.listen(process.env.PORT, (res,req) =>{
    console.log(`Server is now listening in PORT ${process.env.PORT}`)
})