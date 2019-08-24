const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  content: { type: String, trim: true, required: "What no Comment?" },
owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "User ID is required.",
    },
street: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: "Street is required.",
},
city: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: "City is required.",
  },
state: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: "State is required.",
  },
postalCode: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: "Postal Code is required.",
  },
country: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: "Country is required.",
  },
description: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: "Description is required.",
  },
// createdDate: {
//     type: Date,
//     default: Date.now(),
//   },
  created: { type: Date, default: Date.now },
comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
      

    },
  ],
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;