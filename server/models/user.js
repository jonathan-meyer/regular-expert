const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  content: { type: String, trim: true, required: "What no Comment?" },
  firstName: {
    type: String,
    required: "First Name is required.",
  },
  lastName: {
    type: String,
    required: "Last Name is required.",
  },
  email: {
    type: String,
    ref: "User",
    unique: true,
    required: "Email is required.",
  },
  password: {
    type: String,
    required: "Password is required.",
  },
  
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