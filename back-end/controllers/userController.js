const bcrypt = require('bcrypt');
let mysqlConnection = require('../connection');
let models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.signup = (req, res, next) => {
  //Paramètres
  var login = req.body.email;
  var password = req.body.password;

  if (login == null || password == null){
    return res.status(400).json({'error' : "mauvais paramètres"})
  }

  models.utilisateurs.findOne({
    attributes: ['login'],
    where: {login : login}
  })
  .then(function(userFound){
    if (!userFound){
      bcrypt.hash(password, 5, function( err, bcryptedPassword) {
        var newUser = models.utilisateurs.create({
          login: login,
          password: bcryptedPassword 
        })
        .then(function(newUser){
          return res.status(201).json({
            'utilisateursId' : newUser.id
          })
        })
        .catch(function(err){
          return res.status(500).json({ 'error' : "cannot add user"})
        })
      })
    }
    else {
      return res.status(500).json({ 'error' : "user already exist"})
    }
  })

}

exports.login = (req, res, next) => {
  //Paramètres
  var login = req.body.email;
  var password = req.body.password;

  if(login == null || password == null){
    return res.status(400).json({'error' : "missing parameters"})
  }

  models.utilisateurs.findOne({
    where: {login : login}
  })
  .then(function(userFound){
    if(userFound){
      bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
        if(resBycrypt){
          return res.status(200).json({
            'utilisateursId' : userFound.id,
            'token' : jwtUtils.generateTokenForUser(userFound)
          })
        }else {
          return res.status(403).json({"error" : "invalid password"})
        }
      })
    }else {
      return res.status(404).json({'error' : 'user not exist in DB'})
    }
  })
  .catch(function(err){
    return res.status(500).json({'error' : 'unable to verify user'})
  })
}