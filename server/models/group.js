const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
ownerId: {
    type: String,
    trim: true,
    required: "Owner ID is required.",
    },
groupName: {
    type: String,
    required: "Group Name is required.",
},
type: {
    type: String,
    required: "Type is required.",
    default: "General",
  },
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