const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentController.js')

router.get('/', commentCtrl.getAllCommentsFromArticles);
router.post('/send', commentCtrl.sendComment);
router.delete('/delete', commentCtrl.deleteComment);

module.exports = router;