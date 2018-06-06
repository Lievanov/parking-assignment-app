const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.static('public'))
// use in postman
// app.use(bodyParser.urlencoded({ extended: false }));
// use with react
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Routes
require('./routes/parkingRoutes')(app);

console.log("Parking assignment app is running on port " + PORT);
app.listen(PORT);
