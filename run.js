// Run.js - Running the application
const express = require('express');
const app = express();
const path = require('path');

// Set port variable equal to localhost:8000 or heroku app
const port = process.env.PORT || 8000;
// const port = 8000;

// Set port for the app
app.listen(port, () => {
	console.log(`App is listening on ${port}`);
})

// Setting the views folder to call files from
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/'));

// app.use(express.static(__dirname + '/'));

// Calling the home.ejs file from the views folder when on /
app.get('/', (req, res) => { 
	res.render('fetch');
});

// Calling role file to allow functionality
app.get('/harvester/', (req, res) => { 
	res.render('harvester');
});

app.get('/manufacturer/', (req, res) => { 
	res.render('manufacturer');
});

app.get('/distributor/', (req, res) => { 
	res.render('distributor');
});

app.get('/retailer/', (req, res) => { 
	res.render('retailer');
});

app.get('/consumer/', (req, res) => { 
	res.render('consumer');
});

app.get('/fetch/', (req, res) => { 
	res.render('fetch');
});