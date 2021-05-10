// import profData from './config/data.json';
const express = require("express");
const exphbs = require("express-handlebars");
//const connectDB = require('./config/db');
const mongoose = require("mongoose");
const profData = require("./config/data.json");
const port = process.env.PORT || 4000;
var app = express();
var hbs = exphbs.create({});

const dbURI =
	"mongodb+srv://parag:ry0TSDl0qIdbBaKl@cluster0.zzsw3.mongodb.net/scholars?retryWrites=true&w=majority";

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		app.listen(port);
		console.log("Server is on port " + port);
	})
	.catch((err) => console.log(err));

app.engine(
	".hbs",
	exphbs({
		extname: ".hbs",
		defaultLayout: false,
		helpers: {
			json: function (context) {
				return JSON.stringify(context);
			},
		},
	})
);
app.set("view engine", ".hbs");

hbs.handlebars.registerHelper("yearLoop", function (from, to, incr) {
	var accum = "";
	for (var i = from; i < to; i += incr)
		accum += `<option value=${i}>${i}</option>`;
	return accum;
});

hbs.handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
	switch (operator) {
		case "==":
			return v1 == v2 ? options.fn(this) : options.inverse(this);
		case "===":
			return v1 === v2 ? options.fn(this) : options.inverse(this);
		case "!=":
			return v1 != v2 ? options.fn(this) : options.inverse(this);
		case "!==":
			return v1 !== v2 ? options.fn(this) : options.inverse(this);
		case "<":
			return v1 < v2 ? options.fn(this) : options.inverse(this);
		case "<=":
			return v1 <= v2 ? options.fn(this) : options.inverse(this);
		case ">":
			return v1 > v2 ? options.fn(this) : options.inverse(this);
		case ">=":
			return v1 >= v2 ? options.fn(this) : options.inverse(this);
		case "&&":
			return v1 && v2 ? options.fn(this) : options.inverse(this);
		case "||":
			return v1 || v2 ? options.fn(this) : options.inverse(this);
		default:
			return options.inverse(this);
	}
});


hbs.handlebars.registerHelper('forPag', function(currentPage, pagesAfter) {
    var accum = "";
    for(var i = currentPage; i < currentPage + Math.min(pagesAfter,  6); i++){
        if(i === currentPage){
            accum += `<a class="pag-link current-page">${i}</a>`;
        }
        else accum += `<a class="pag-link" href="/publications/search?page=${i}&limit=20">${i}</a>`;
    }
    return accum;
});

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});
//connectDB();

app.use("/profiles", require("./routes/profile"));
app.use("/publications", require("./routes/publication"));
app.use("/", require("./routes/abstract"));
app.use("/", require("./routes/index"));
