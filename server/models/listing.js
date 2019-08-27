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

  street: {
    type: String,
    required: "Street is required."
  },

  city: {
    type: String,
    required: "City is required."
  },

  state: {
    type: String,
    required: "State is required."
  },

  zip: {
    type: String,
    required: "Postal Code is required."
  },

  country: {
    type: String,
    default: "USA"
  },

  description: {
    type: String,
    required: "Description is required."
  },

  created: {
    type: Date,
    default: Date.now
  }
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
