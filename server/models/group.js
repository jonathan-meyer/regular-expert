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
name: {
    type: String,
    required: "Group Name is required.",
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

});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;