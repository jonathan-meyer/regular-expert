const express = require("express");

const realtor = require("../../controllers/realtor");

const router = express.Router();

router.get("/listing/:property_id/:listing_id", (req, res) => {
  const { property_id, listing_id } = req.params;

  realtor
    .detail(property_id, listing_id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/search", (req, res) => {
  const { q } = req.query;

  if (q) {
    realtor
      .autoComplete(q)
      .then(data => {
        if (data.autocomplete.length > 0) {
          const { city, state_code } = data.autocomplete[0];

          realtor
            .listForSale(city, state_code)
            .then(data => res.json(data))
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
