const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require("cookie-session");
const mongoose = require('mongoose');
const keys = require("./config/keys");
require('./models/Request');
require('./models/User');
require('./config/passport');
const db = require('./db');
const passport = require("passport");

mongoose.connect(keys.mongoURI);
const app = express();
// use in postman
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));
// use with react
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ["asdas5da46d546"]
    })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

// Routes
require("./routes/oauthRoutes")(app);
require("./routes/parkingRoutes")(app);

console.log("Parking assignment app is running on port " + PORT);
app.listen(PORT);
