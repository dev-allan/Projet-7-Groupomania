const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO customers (name, address) VALUES ?";
        var values = [
          [req.body.pseudo, bcrypt.hash(req.body.password, 10)],
        ];
        connection.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
    });
};

exports.login = (req, res, next) => {
    
};