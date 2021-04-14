// import profData from './config/data.json';
const express = require('express')
const exphbs = require('express-handlebars')
//const connectDB = require('./config/db');
const mongoose = require('mongoose')
const profData = require('./config/data.json')

const port = process.env.PORT || 4000
var app = express()

const dbURI =
    'mongodb+srv://parag:ry0TSDl0qIdbBaKl@cluster0.zzsw3.mongodb.net/scholars?retryWrites=true&w=majority'

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port)
        console.log('Server is on port ' + port)
    })
    .catch((err) => console.log(err))

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: false }))
app.set('view engine', '.hbs')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.locals.path = req.path
    next()
})
//connectDB();

app.get('/', function (req, res) {
    res.render('home.hbs', { profData })
})

app.use('/profiles', require('./routes/profile'))
app.use('/publications', require('./routes/publication'))
