const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const refreshTokenSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    refreshTokens: [{
      type: String
    }],
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("refreshTokenList", refreshTokenSchema);
