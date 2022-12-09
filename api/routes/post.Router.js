const express = require("express");
const { createPost } = require("../controllers/createPost.controller.js");
const getAllPost = require("../controllers/getAllPost.controller.js");
const updateProfile = require("../controllers/updateProfile.controller.js");
const likeAndUnlike = require("../controllers/likeAndUnlike.controller.js");
const deletePost = require("../controllers/deletePost.controller.js");
const editPost = require("../controllers/editPost.controller.js");

const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.delete("/:postId", deletePost);
postRouter.put("/:postId", editPost);
postRouter.get("/", getAllPost);
postRouter.put("/profilePic", updateProfile);
postRouter.put("/likeAndUnlike/:postId", likeAndUnlike);

module.exports = postRouter;
