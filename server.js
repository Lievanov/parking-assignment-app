const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

console.log("Parking assignment app is running on port " + PORT);
app.listen(PORT);
