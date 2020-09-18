const mysql = require('mysql');
const express = require('express');
const app = express();


//Connection à la BDD MySQL
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'groupomania'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
});


//Permettre aux navigateurs d'accepter les requêtes venant de deux serveurs différents
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


module.exports = app;
