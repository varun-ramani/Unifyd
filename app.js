const express = require('express');
const routing = require('./routing');

var app = express();
var port = 3000;

app.use(express.static('static'));

routing.setupRouting(app);

app.listen(port, () => console.log("We're up and running!"));