// import profs from './db/faculties';
const express = require('express');
const exphbs = require('express-handlebars');

const port = process.env.PORT || 4000;
var app = express();

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: false}))
app.set('view engine', '.hbs');
console.log(__dirname);
app.use(express.static(__dirname + '/public'));

const profs = 
[
	{
		name: "Dr. Shishur Verma",
		scholar_id: "68461568",
		orcut_id: "s45djcas4",
		department: "Department of Information Technology",
		citations: "54",
		publications: "167",
		avatar_url: "/images/img_prof1.jpg",
	},
	{
		name: "Dr. Shishur Verma",
		scholar_id: "68461568",
		orcut_id: "s45djcas4",
		department: "Department of Information Technology",
		citations: "54",
		publications: "167",
		avatar_url: "/images/img_prof2.jpg",
	},
	{
		name: "Dr. Shishur Verma",
		scholar_id: "68461568",
		orcut_id: "s45djcas4",
		department: "Department of Information Technology",
		citations: "54",
		publications: "167",
		avatar_url: "/images/img_prof4.jpg",
	},
	{
		name: "Dr. Shishur Verma",
		scholar_id: "68461568",
		orcut_id: "s45djcas4",
		department: "Department ofInformation Technology",
		citations: "54",
		publications: "167",
		avatar_url: "/images/img_prof5.png",
	},
	{
		name: "Dr. Shishur Verma",
		scholar_id: "68461568",
		orcut_id: "s45djcas4",
		department: "Department ofInformation Technology",
		citations: "54",
		publications: "167",
		avatar_url: "/images/img_prof3.jpeg",
	},
	{
		name: "Dr. Shishur Verma",
		scholar_id: "68461568",
		orcut_id: "s45djcas4",
		department: "Department ofInformation Technology",
		citations: "54",
		publications: "167",
		avatar_url: "/images/img_prof1.jpg",
	},
];

app.get('/', function (req, res) {
    res.render('home.hbs', {profs});
});

app.listen(port, () => {
	console.log(`Server is on port ${port}`);
});

