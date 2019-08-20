const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First Name is required.",
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is required.",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email is required.",
  },
  password: {
    type: String,
    trim: true,
    required: "Password is required.",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "group",
    },
  ],
  listings: [
    {
      type: Schema.Types.ObjectId,
      ref: "listing",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;