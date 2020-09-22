const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'projet7_development',
    multipleStatements : true
});

mysqlConnection.connect((err)=> {
    if (!err) {
      console.error('Connected');
    }
    else
   {
    console.log('connection failed');
   }
});

module.exports = mysqlConnection;