let mysqlConnection = require('../connection');
let models = require('../models/');
let jwtUtils = require('../middleware/auth');

exports.getAllCommentsFromArticles = (req, res, next)=>{
    mysqlConnection.query("SELECT contenu_commentaire FROM articles INNER JOIN commentaires", (err, rows, fields)=>{
        if(!err)
            {
                res.send(rows);
            }
        else
            {
                console.log(err);
            }
    })
}

exports.getCommentFromArticle = (req, res, next) => {
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes : ['id', 'login'],
        where: {id: utilisateursId}
    }).then(function(user){
        if (user) {
            var articles_Id = req.params.id
            var data = [articles_Id]
            mysqlConnection.query('SELECT login, contenu_commentaire FROM utilisateurs INNER JOIN commentaires ON commentaires.pseudo = utilisateurs.id WHERE articles_id = ?', data, (err,rows, fields) => {
                if (!err){
                    res.send(rows);
                }
                else {
                    console.log(err)
                }
            })
        } else {
            res.status(404).json({"error" : "utilisateur introuvable"})
        }
    }).catch(function(err) {
        res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
    })
}

exports.sendComment = (req, res, next) => {
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login'],
        where: {id: utilisateursId}
      }).then(function(user){
        if (user) {
            var pseudo = utilisateursId
            var contenu_commentaire = req.body.comment
            var articles_Id = req.body.articles_Id
            var data = [pseudo, contenu_commentaire, articles_Id]
            mysqlConnection.query("INSERT INTO commentaires SET pseudo=?, contenu_commentaire=?, articles_id=?, createdAt = NOW(), updatedAt = NOW()", data, (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                }
        
                else {
                    console.log(err);
                }
            })
        } else {
          res.status(404).json({"error" : "utilisateur introuvable"})
        }
      }).catch(function(err) {
        res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
      })
}

exports.deleteComment = (req, res, next) => {
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login'],
        where: {id: utilisateursId}
      }).then(function(user){
        if (user) {
            var id = req.params.id
            var pseudo = jwtUtils.getUserId(headerAuth)
            var data = [id, pseudo]
            mysqlConnection.query('DELETE FROM commentaires WHERE id=? AND pseudo=?', data, (err,rows, fields) => {
                if (!err) {
                    res.send(rows);
                }
        
                else {
                    console.log(err);
                }
            })
        } else {
          res.status(404).json({"error" : "utilisateur introuvable"})
        }
      }).catch(function(err) {
        res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
      })
}

exports.deleteCommentFromModerator = (req, res, next) => {
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login', 'permission'],
        where: {id: utilisateursId,
                permission: permission = 'Moderator'}
      }).then(function(user){
        if (user) {
            var id = req.params.id
            var data = [id]
            mysqlConnection.query('DELETE FROM commentaires WHERE id=?', data, (err,rows, fields) => {
                if (!err) {
                    res.send(rows);
                }
        
                else {
                    console.log(err);
                }
            })
        } else {
          res.status(404).json({"error" : "utilisateur introuvable"})
        }
      }).catch(function(err) {
        res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
      })
}

exports.modifyCommentFromModerator = (req, res, next)=>{
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login', 'permission'],
        where: {id: utilisateursId,
                permission : permission = 'Moderator'}
      }).then(function(user){
        if (user) {
            var contenu_commentaire = req.body.comment
            var id = req.body.id
            var data = [contenu_commentaire, id]
            mysqlConnection.query('UPDATE commentaires SET contenu_commentaire=?, updatedAt =NOW() WHERE id=?', data, (err, rows, fields)=> {
                if(!err)
                {
                    res.send(rows);
                }
                else
                {
                    console.log(err);
                }         
            })
        } else {
          res.status(404).json({"error" : "L'utilisateur n'a pas les privilèges requis"})
        }
      }).catch(function(err) {
        res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
      })
}

exports.getAllComments = (req, res, next) => {
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes : ['id', 'login'],
        where: {id: utilisateursId}
    }).then(function(user){
        if (user) {
            mysqlConnection.query('SELECT commentaires.id, login, contenu_commentaire FROM utilisateurs INNER JOIN commentaires ON commentaires.pseudo = utilisateurs.id', (err,rows, fields) => {
                if (!err){
                    res.send(rows);
                }
                else {
                    console.log(err)
                }
            })
        } else {
            res.status(404).json({"error" : "utilisateur introuvable"})
        }
    }).catch(function(err) {
        res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
    })
}
