const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articleController.js')

router.get('/', articleCtrl.getAllArticles);
router.get('/id', articleCtrl.getOneArticle);
router.post('/send', articleCtrl.sendArticles);
router.delete('/delete', articleCtrl.deleteArticles);
router.put('/update', articleCtrl.modifyArticles);





module.exports = router;