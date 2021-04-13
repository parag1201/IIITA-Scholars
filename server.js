// import profData from './config/data.json';
const express = require('express');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const profData = require('./config/data.json');

const port = process.env.PORT || 4000;
var app = express();

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: false}))
app.set('view engine', '.hbs');
app.use(express.static(__dirname + '/public'));

app.use(express.json({extended: false}));

connectDB();

app.get('/', function (req, res) {
    res.render('home.hbs', {profData});
});

app.use('/profiles', require('./routes/profile'));
app.use('/publications', require('./routes/publication'));

app.listen(port, () => {
	console.log(`Server is on port ${port}`);
});

