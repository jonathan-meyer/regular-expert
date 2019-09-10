const express = require("express");
const _ = require("lodash");

const crud = require("../../controllers/crud");
const realtor = require("../../controllers/realtor");

const Group = require("../models/group");
const User = require("../models/user");
const Listing = require("../models/listing");

const router = express.Router();

const getRealtorListing = listing =>
  realtor
    .detail(listing.property_id, listing.listing_id)
    .then(mls =>
      _.omit(mls.listing, [
        "tax_history",
        "trend",
        "property_history",
        "price_history",
        "photos",
        "office",
        "neighborhoods",
        "neighborhood",
        "mortgage",
        "msl",
        "lead_forms",
        "client_provider_data",
        "client_event_data",
        "broker",
        "client_display_flags",
        "branding",
        "agent"
      ])
    )
    .then(mls => ({ ...listing.toObject(), mls }));

router.use("/realtor", require("./realtor"));

router.use("/comment", crud(require("../models/comment")));

router.use("/group/mine", (req, res) => {
  Group.find({ owner: req.user._id })
    .populate("users")
    .then(data => res.json(data))
    .catch(err => {
      console.log({ err });
      res.sendStatus(404);
    });
});

router.use("/group", crud(Group));

router.use("/listing/group/:id", (req, res) => {
  Listing.find({ group: req.params.id }, (err, listings) => {
    if (err) {
      res.status(500).json(err);
    } else {
      Promise.all(listings.map(listing => getRealtorListing(Listing))).then(
        data => res.json(data)
      );
    }
  });
});

router.use("/listing/:property_id/:listing_id", (req, res) => {
  const { user, property_id, listing_id } = req.params;

  Listing.findOne({ property_id, listing_id })
    .exec()
    .then(listing => {
      if (!listing) {
        return Listing.create({ property_id, listing_id });
      } else {
        return listing;
      }
    })
    .then(listing => getRealtorListing(listing).then(data => res.json(data)))
    .catch(err => {
      console.log({ err });
      res.status(500).json(err.message);
    });

  // , (err, listings) => {
  //   if (err) {
  //   } else {
  //     if (listings.length > 0) {
  //       getRealtorListing(listings[0]).then(data => res.json(data));
  //     } else {
  //       res.sendStatus(404);
  //     }
  //   }
  // });
});

router.use("/listing", crud(Listing));

router.use("/user/list", (req, res) => {
  User.find({}, "_id firstName lastName", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

router.use("/user", crud(User));

module.exports = router;
