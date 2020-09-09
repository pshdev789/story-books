const path = require('path')
// Declare express server and dotenv for config properties
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')// Used to manage env variables.Just like application.prop in springboot
const morgan = require('morgan')// For logging
const exphbs= require('express-handlebars') //as a template engine
const passport = require('passport')
const session = require('express-session')
const MongoStore= require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config:set the path to config file
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

// Initialize app with express
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// HandleBars
app.engine('.hbs', exphbs({ defaultLayout:'main',extname: '.hbs'}));
app.set('view engine','.hbs');

// Sessions

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})

  }))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index')) 
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.port || 5000
// call application
app.listen(PORT, 
    console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )



