const express = require('express');
const bodyParser = require('body-parser');
const articlesRoute = require('./routes/articleRoute')

var app = express();
app.use(bodyParser.json());

app.use('/articles', articlesRoute);

module.exports = app;
