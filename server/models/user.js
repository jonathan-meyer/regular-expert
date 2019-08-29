const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

// Define userSchema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: "First Name is required."
  },

  lastName: {
    type: String,
    required: "Last Name is required."
  },

  username: {
    type: String,
    ref: "User",
    unique: true,
    required: "Username is required."
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

// Define schema methods
UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
UserSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
