const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: "What no Comment?"
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "you need an UserID"
  },

  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: "you need a GroupID"
  },

  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: "you need a ListingID"
  },

  created: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
