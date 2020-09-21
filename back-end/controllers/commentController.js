let mysqlConnection = require('../connection');

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

exports.sendComment = (req, res, next) => {
    var pseudo = ''
    var contenu_commentaire = ''
    var articles_Id = ""
    var data = [pseudo, contenu_commentaire, articles_Id]
    mysqlConnection.query('INSERT INTO commentaires SET pseudo=?, contenu_commentaire=?, articles_id=?', data, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }

        else {
            console.log(err);
        }
    })
}

exports.deleteComment = (req, res, next) => {
    // var id = TypeNumber
    var data = [id]
    mysqlConnection.query('DELETE FROM commentaires WHERE id=?', data, (err,rows, fields) => {
        if (!err) {
            res.send(rows);
        }

        else {
            console.log(err);
        }
    })
}