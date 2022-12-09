const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "cover", null],
      default: null,
    },
    edited:{
      type: Boolean,
      default:false
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String, 
        },
        image: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: "User",
        },
        commentAt: {
          type: Date,
        },
      },
    ],
   like:[]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
