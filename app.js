const path = require('path')
const express = require('express')
const mongoose= require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride=require('method-override')
const passport = require('passport')
const session= require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

//load config
dotenv.config({path: './config/config.env'})

//passport config
require('./config/passport')(passport)

//call mongo
connectDB()

const app = express()

//body-parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
})
)

//logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//handlebars
//app.engine('.hbs', exphbs({ deafaultLayout: 'main', extname: '.hbs'}));
//app.set('view engine', '.hbs'); 
app.set('view engine', 'ejs');

//sessions middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }))

//set passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
//app.use('/assets',express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/bookmarks',require('./routes/bookmarks'))

const PORT = process.env.PORT || 3000
app.listen(
    PORT,
    console.log (`Server running ${process.env.NODE_ENV} mode on port ${PORT}`)
    )