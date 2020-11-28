const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8081;
const app = express();
const db = require('./db');

const test = true;

const setUpApp = () => {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use('/api', require('./routes'));

	app.get('/', (req, res) => {
		res.status(200).send('Hello World!!');
	});

	app.listen(port, () => {
		console.log(`Course Signup Server listening at http://localhost:${port}`);
	});
}


const setUpDB = () => {
	// if (test) { }
};

db.sync({ force: test }).then(() => {
	test && console.log('Dropped and re-sync db.');
	setUpApp();
	setUpDB();
}).catch(console.error);
