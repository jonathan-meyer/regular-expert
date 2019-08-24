const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  content: { type: String, trim: true, required: "What no Comment?" },
  firstName: {
    type: Schema.Types.objectId,
    ref: "User",
    required: "First Name is required.",
  },
  lastName: {
    type: Schema.Types.objectId,
    trim: true,
    required: "Last Name is required.",
  },
  email: {
    type: Schema.Types.objectId,
    ref: "User",
    unique: true,
    required: "Email is required.",
  },
  password: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: "Password is required.",
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  created: { type: Date, default: Date.now },
  
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