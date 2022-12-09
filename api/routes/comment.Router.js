const express = require("express");
const addComment = require("../controllers/addComment.controller.js");
const getCommenterInfo = require("../controllers/getCommenterInfo.controller.js");
const deleteComment = require("../controllers/deleteComment.controller.js");


const commentRouter = express.Router();

commentRouter.post("/:postId",addComment)
commentRouter.get("/getCommenterInfo/:userId",getCommenterInfo)
commentRouter.delete("/:postId/:commentId",deleteComment)

module.exports = commentRouter;
