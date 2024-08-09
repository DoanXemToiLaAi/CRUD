const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    role: {
      type: String,
      default: "user",
    },
    address: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Address",
      },
    ],
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
