const express = require("express");
const checkAuth = require("../middleware/check-auth");
const PostsController = require("../controllers/post");
const extractFile = require("../middleware/file");

const router = express.Router();

// POST new post
router.post("", checkAuth, extractFile, PostsController.createNewPost);

// GET all posts
router.get("", PostsController.getAllPosts);

// DELETE a post
router.delete("/:id", checkAuth, PostsController.deletePost);

// PUT new content in existing post
router.put("/:id", checkAuth, extractFile, PostsController.editPost);

// GET a specific post
router.get("/:id", PostsController.getPost);

module.exports = router;
