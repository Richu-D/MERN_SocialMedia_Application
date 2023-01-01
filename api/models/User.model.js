const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true
    },

    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique:true
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    picture: {
      type: String,
      trim: true,
      default:null,
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      trim: true,
      enum: ["male", "female", "other"]
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    Posts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        }
      }
    ],
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    chatFriends: {
      type: Array,
      default: [],
    },
    blockedPeople: {
      type: Array,
      default: [],
    },
    details: {
      bio: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema)