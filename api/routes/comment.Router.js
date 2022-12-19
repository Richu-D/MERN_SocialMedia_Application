const express = require("express");
const addComment = require("../controllers/User/addComment.controller.js");
const getCommenterInfo = require("../controllers/User/getCommenterInfo.controller.js");
const deleteComment = require("../controllers/User/deleteComment.controller.js");


const commentRouter = express.Router();

commentRouter.post("/:postId",addComment)
commentRouter.get("/getCommenterInfo/:userId",getCommenterInfo)
commentRouter.delete("/:postId/:commentId",deleteComment)

module.exports = commentRouter;
