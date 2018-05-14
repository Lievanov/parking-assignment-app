const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

console.log("Project is running on port " + PORT);
app.listen(PORT);
