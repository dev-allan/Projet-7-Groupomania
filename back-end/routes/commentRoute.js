const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/commentController.js')

router.get('/', commentCtrl.getAllCommentsFromArticles);
router.get('/comment', commentCtrl.getCommentFromArticle);
router.post('/send', commentCtrl.sendComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;