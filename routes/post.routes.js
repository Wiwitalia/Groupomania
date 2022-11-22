const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require("multer");
const upload = multer();

router.get('/', postController.readPost);  // Pour avoir tous les posts
router.post('/', upload.single("file"), postController.createPost);  // Pour creer un post
router.put('/:id', postController.updatePost);  // Pour modifier un post
router.delete('/:id', postController.deletePost);  // Pour supprimer un post
router.patch('/like-post/:id', postController.likePost);  // Pour liker un post
router.patch('/unlike-post/:id', postController.unlikePost);  // Pour unliker un post

// comments
router.patch('/comment-post/:id', postController.commentPost);  // Route pour laisser un commentaire
router.patch('/edit-comment-post/:id', postController.editCommentPost);  // Route pour editer un commentaire
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);  // Route pour supprimer un commentaire

module.exports = router;