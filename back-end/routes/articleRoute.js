const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const articleCtrl = require('../controllers/articleController.js');

router.get('/', articleCtrl.getAllArticles);
router.get('/:id', articleCtrl.getOneArticle);
router.post('/send', articleCtrl.sendArticles);
router.delete('/:id', articleCtrl.deleteArticles);
router.put('/update', articleCtrl.modifyArticles);





module.exports = router;