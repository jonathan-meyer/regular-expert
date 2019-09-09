const express = require("express");
const _ = require("lodash");

const crud = require("../../controllers/crud");
const realtor = require("../../controllers/realtor");

const User = require("../models/user");
const Listing = require("../models/listing");

const router = express.Router();

router.use("/realtor", require("./realtor"));

router.use("/comment", crud(require("../models/comment")));
router.use("/group", crud(require("../models/group")));

router.use("/listing/group/:id", (req, res) => {
  Listing.find({ group: req.params.id }, (err, listings) => {
    if (err) {
      res.status(500).json(err);
    } else {
      Promise.all(
        listings.map(listing => {
          const { listing_id, property_id } = listing;

          return realtor
            .detail(property_id, listing_id)
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
        })
      ).then(data => res.json(data));
    }
  });
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
