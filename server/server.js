const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8080;
const app = express();
const db = require('./db');

const test = false;

const setUpApp = () => {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use('/api', require('./routes'));
}

const startApp = () => {
	app.get('/', (req, res) => {
		res.status(200).send('Hello World!!');
	});

	app.listen(port, () => {
		console.log(`Course Signup Server listening at http://localhost:${port}`);
	});
}

db.sync({ force: test })
	.then(setUpApp)
	.then(startApp)
	.catch(console.error);
