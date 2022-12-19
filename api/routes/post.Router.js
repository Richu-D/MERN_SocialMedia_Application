const express = require("express");
const { createPost } = require("../controllers/User/createPost.controller.js");
const getAllPost = require("../controllers/User/getAllPost.controller.js");
const updateProfile = require("../controllers/User/updateProfile.controller.js");
const updateCover = require("../controllers/User/updateCover.controller.js");
const likeAndUnlike = require("../controllers/User/likeAndUnlike.controller.js");
const deletePost = require("../controllers/User/deletePost.controller.js");
const editPost = require("../controllers/User/editPost.controller.js");

const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.put("/profilePic", updateProfile);
postRouter.put("/cover", updateCover);
postRouter.delete("/:postId", deletePost);
postRouter.put("/:postId", editPost);
postRouter.get("/", getAllPost);
postRouter.put("/likeAndUnlike/:postId", likeAndUnlike);

module.exports = postRouter;
