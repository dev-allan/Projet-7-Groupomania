const jwt = require('jsonwebtoken')
let mysqlConnection = require('../connection');

exports.signup = (req, res, next) => {
    var login = "emailtestcrypto@exemple.fr"
    var password = "123"
    let crypto = require('crypto')
    const hash = crypto.createHmac('sha256', password)
                .update(';zedo5666efhebms,zljjdbeiohfk"rjbfiu"hedpndOKO216POkjzebfpzksùzaep"éoroihfjenmzjduEEE---czstr')
                .digest('hex');
    var data = [login, hash]
    mysqlConnection.query("INSERT INTO utilisateurs SET login=?, password=?", data,(err, rows,field)=>{
      if (!err) {
        res.send(rows);
    }

    else {
        console.log(err);
    }
    })
}

exports.login = (req, res, next) => {
    var login = 'emailtest@exemple.fr'
    var password = '123'
    var data = [login, password]
    mysqlConnection.query("SELECT * FROM utilisateurs WHERE login =? AND password=?", data,(err, rows,field)=>{
      if (!err) {
        res.send(rows);
        const token = jwt.sign({ data }, "123456");
        res.json({
          token : token
        });
    }

    else {
        console.log(err);
    }
    })
}



// exports.login = (req, res, next) => {
//   const user = {id : 3};
//   const token = jwt.sign({ user }, "123456");
//   res.json({
//     token : token
//   });
// };