let mysqlConnection = require('../connection');
let models = require('../models/articles');
let jwtUtils = require('../middleware/auth')

exports.getAllArticles = (req, res, next)=>{
    mysqlConnection.query("SELECT * FROM articles", (err, rows, fields)=>{
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

exports.getOneArticle = (req, res, next)=>{
    var id = "1"
    var data = [id]
    mysqlConnection.query('SELECT * FROM articles WHERE id =?',data, (err, rows, fields)=>{
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

exports.sendArticles = (req, res, next)=>{
    var titre = req.body.title
    var contenu = req.body.content
    var court = req.body.smallContent
    var data = [titre, contenu, court]
    mysqlConnection.query('INSERT INTO articles SET titre =?, contenu =?, court =?, createdAt =NOW(), updatedAt =NOW()',data, (err, articles, fields) => {
        if (!err) {
            res.send(articles);
        }

        else {
            console.log(err);
        }
    })
}

exports.deleteArticles = (req, res, next)=>{
    var id = ""
    var data = [id]
    mysqlConnection.query('DELETE FROM articles WHERE id=?', data, (err,rows, fields)=>{
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

exports.modifyArticles = (req, res, next)=>{
    var titre = ""
    var contenu = ""
    var court = ""
    var id = ""
    var data = [titre, contenu,court, id]
    mysqlConnection.query('UPDATE articles SET titre=?, contenu=?, court=? WHERE id=?', data, (err, rows, fields)=> {
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