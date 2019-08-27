const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: "First Name is required."
  },

  lastName: {
    type: String,
    required: "Last Name is required."
  },

  email: {
    type: String,
    ref: "User",
    unique: true,
    required: "Email is required."
  },

  password: {
    type: String,
    required: "Password is required."
  },

  created: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
