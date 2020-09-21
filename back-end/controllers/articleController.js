let mysqlConnection = require('../connection');

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
    var titre = ""
    var contenu = ""
    var court = ""
    var data = [titre, contenu, court]
    mysqlConnection.query('INSERT INTO articles SET titre =?, contenu =?, court =?',data, (err, articles, fields) => {
        if (!err) {
            res.send(articles);
        }

        else {
            console.log(err);
        }
    })
}

exports.deleteArticles = (req, res, next)=>{
    var id = "1"
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