const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
ownerId: {
    type: String,
    trim: true,
    required: "Owner ID is required.",
    },
street: {
    type: String,
    required: "Street is required.",
},
city: {
    type: String,
    required: "City is required.",
  },
state: {
    type: String,
    required: "State is required.",
  },
postalCode: {
    type: String,
    required: "Postal Code is required.",
  },
country: {
    type: String,
    required: "Country is required.",
  },
description: {
    type: String,
    required: "Description is required.",
  },
createdDate: {
    type: Date,
    default: Date.now(),
  },
comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;