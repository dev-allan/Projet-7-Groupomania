const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/commentController.js')

router.get('/', commentCtrl.getAllCommentsFromArticles);
router.get('/comment', commentCtrl.getCommentFromArticle);
router.post('/send', commentCtrl.sendComment);
router.delete('/:id', commentCtrl.deleteComment);
router.delete('/moderator/:id', commentCtrl.deleteCommentFromModerator);
router.put('/moderator/modify', commentCtrl.modifyCommentFromModerator);

module.exports = router;