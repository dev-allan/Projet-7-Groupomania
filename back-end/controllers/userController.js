const bcrypt = require('bcrypt');
let mysqlConnection = require('../connection');
let models = require('../models');
const jwtUtils = require('../middleware/auth');

exports.signup = (req, res, next) => {
  //Paramètres
  var login = req.body.email;
  var password = req.body.password;

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

exports.getUserProfile = (req, res, next) => {
  var headerAuth = req.headers['authorization'];
  var utilisateursId = jwtUtils.getUserId(headerAuth);

  if (utilisateursId < 0)
  return res.status(400).json({'error' : 'faux token'})

  models.utilisateurs.findOne({
    attributes: ['id', 'login','permission'],
    where: {id: utilisateursId}
  }).then(function(user){
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({"error" : "utilisateur introuvable"})
    }
  }).catch(function(err) {
    res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
  })
}

exports.deleteAccount = (req, res, next) => {
  var headerAuth = req.headers['authorization'];
  var utilisateursId = jwtUtils.getUserId(headerAuth);

  models.utilisateurs.findOne({
      attributes : ['id', 'login'],
      where: {id: utilisateursId}
  }).then(function(user){
      if (user) {
        var id = utilisateursId
        var data = [id]
        mysqlConnection.query('SET FOREIGN_KEY_CHECKS=OFF; DELETE FROM utilisateurs WHERE id=?; SET FOREIGN_KEY_CHECKS=ON;', data, (err,rows, fields) => {
          if(!err){
            res.send(rows);
          }
          else{
            console.log(err)
          }
        })
      }else {
        res.status(404).json({"error" : "utilisateur introuvable"})
      }
  }).catch(function(err){
    res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
  })
}