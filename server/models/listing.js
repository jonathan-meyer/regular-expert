const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "User ID is required."
  },

  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: "Group Id is required"
  },

  property_id: {
    type: Schema.Types.String,
    required: "A Property ID from realtor.com is required."
  },

  listing_id: {
    type: Schema.Types.String,
    required: "A Listing ID from realtor.com is required."
  },

  created: {
    type: Date,
    default: Date.now
  }
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
