let mysqlConnection = require('../connection');
let models = require('../models/');
let jwtUtils = require('../middleware/auth');

exports.getAllArticles = (req, res, next)=>{
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login'],
        where: {id: utilisateursId}
      }).then(function(user){
        if (user) {
          mysqlConnection.query("SELECT login, titre, contenu, court, articles.id FROM utilisateurs INNER JOIN articles ON articles.pseudo = utilisateurs.id", (err, rows, fields)=>{
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
          res.status(404).json({"error" : "utilisateur introuvable"})
        }
      }).catch(function(err) {
        res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
      })
}

exports.getOneArticle = (req, res, next)=>{
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login'],
        where: {id: utilisateursId}
    }).then(function(user){
        if (user) {
        var id = req.params.id
        var data = [id]
        mysqlConnection.query('SELECT login, titre, contenu, court FROM utilisateurs INNER JOIN articles ON articles.pseudo = utilisateurs.id WHERE articles.id =?',data, (err, rows, fields)=>{
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
        res.status(404).json({"error" : "utilisateur introuvable"})
        }
     }).catch(function(err) {
    res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
    })
}

exports.sendArticles = (req, res, next)=>{
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login'],
        where: {id: utilisateursId}
    }).then(function(user){
        if (user) {
            var pseudo = utilisateursId
            var titre = req.body.title
            var contenu = req.body.content
            var court = req.body.smallContent
            var data = [pseudo, titre, contenu, court]
            mysqlConnection.query('INSERT INTO articles SET pseudo =?, titre =?, contenu =?, court =?, createdAt =NOW(), updatedAt =NOW()',data, (err, articles, fields) => {
                if (!err) {
                    res.send(articles);
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

exports.deleteArticles = (req, res, next)=>{
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
            mysqlConnection.query('DELETE FROM articles WHERE id =? AND pseudo =?',data, (err,rows, fields)=>{
                if(!err)
                {
                    res.send(rows);
                }
                else{
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

exports.modifyArticlesFromModerator = (req, res, next)=>{
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login', 'permission'],
        where: {id: utilisateursId,
                permission : permission = 'Moderator'}
      }).then(function(user){
        if (user) {
            var titre = req.body.title
            var contenu = req.body.content
            var court = req.body.smallContent
            var id = req.body.id
            var data = [titre, contenu,court, id]
            mysqlConnection.query('UPDATE articles SET titre=?, contenu=?, court=?, updatedAt =NOW() WHERE id=?', data, (err, rows, fields)=> {
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

exports.deleteArticlesFromModerator = (req, res, next)=>{
    var headerAuth = req.headers['authorization'];
    var utilisateursId = jwtUtils.getUserId(headerAuth);

    models.utilisateurs.findOne({
        attributes: ['id', 'login', 'permission'],
        where: {id: utilisateursId,
                permission : permission = 'Moderator'}
      }).then(function(user){
        if (user) {
            var id = req.params.id
            var data = [id]
            mysqlConnection.query('DELETE FROM articles WHERE id = ?',[data], (err,rows, fields)=>{
                if(!err)
                {
                    res.send(rows);
                }
                else{
                    console.log(err);
                }  
            })
        } else {
          res.status(404).json({"error" : "l'utilisateur n'a pas les privilèges requis"})
        }
      }).catch(function(err) {
        res.status(500).json({'error' : "impossible de récupérer l'utilisateur"})
      })

}