// import profData from './config/data.json';
const express = require('express')
const exphbs = require('express-handlebars')
//const connectDB = require('./config/db');
const mongoose = require('mongoose')
const profData = require('./config/data.json')
const port = process.env.PORT || 4000
var app = express()
var hbs = exphbs.create({});

const dbURI =
    'mongodb+srv://parag:ry0TSDl0qIdbBaKl@cluster0.zzsw3.mongodb.net/scholars?retryWrites=true&w=majority'

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port)
        console.log('Server is on port ' + port)
    })
    .catch((err) => console.log(err))

app.engine(
    '.hbs',
    exphbs({
        extname: '.hbs',
        defaultLayout: false,
        helpers: {
            json: function (context) {
                return JSON.stringify(context)
            },
        },
    })
)
app.set('view engine', '.hbs')

hbs.handlebars.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += `<option value=${i}>${i}</option>`;
    return accum;
});

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.locals.path = req.path
    next()
})
//connectDB();

app.use('/profiles', require('./routes/profile'))
app.use('/publications', require('./routes/publication'))
app.use('/', require('./routes/abstract'))
app.use('/', require('./routes/index'))

/*

var x = {{{json articles}}}
        console.log(x[0])
        
*/
