const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    emiterId: {
      type: String,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    postId: {
      type: String,
      ref: "Post",
      required: true,
    },
    isVisited: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("notifications", NotificationSchema);
module.exports = NotificationModel