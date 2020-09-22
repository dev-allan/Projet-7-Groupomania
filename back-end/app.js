const express = require('express');
const bodyParser = require('body-parser');
const articlesRoute = require('./routes/articleRoute.js');
const commentRoute = require('./routes/commentRoute.js');
const userRoute = require('./routes/userRoute')

var app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/articles', articlesRoute);
app.use('/commentaires', commentRoute);
app.use('/utilisateurs', userRoute)

module.exports = app;
