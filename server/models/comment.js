const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  ownerId: {
    type: String,
    trim: true,
    required: "Owner ID is required.",
  },
  groupId: {
    type: String,
    trim: true,
    required: "Group ID is required.",
  },
  listingId: {
    type: String,
    trim: true,
    required: "Listing ID is required.",
  },
  content: {
    type: String,
    trim: true,
    required: "Comment cannot be empty.",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;