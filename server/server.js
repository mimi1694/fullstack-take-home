const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8080;
const app = express();
const db = require('./db');

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./routes'));

app.get('/', (req, res) => {
	res.status(200).send('Hello World!!');
});

app.listen(port, () => {
	console.log(`Course Signup Server listening at http://localhost:${port}`);
});

db.sync({ force: true }).then(() => {
  console.log('Dropped and re-sync db.');
}).catch(console.error);
