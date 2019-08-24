const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  content: {type: String, trim: true, required: ""},
  // owner, reference the user model
owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "you need an UserID",
    },
group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: "Group Name is required.",
},
type: {
    type: Schema.Types.ObjectId,
    ref: "Type",
    required: "Type is required.",
    default: "General",
  },
// check this
  numberUsers: {
    type: Number,
  },  
lastModifiedDate: {
    type: Date,
    default: Date.now(),
  },
users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
listings: [
    {
      type: Schema.Types.ObjectId,
      ref: "listing",
    },
  ],
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;