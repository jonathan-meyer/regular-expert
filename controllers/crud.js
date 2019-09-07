const express = require("express");

module.exports = Collection => {
  // ======
  // Create
  // ======
  const create = (req, res) => {
    const newEntry = req.body;

    Collection.create(newEntry, (e, newEntry) => {
      if (e) {
        res.status(500).send(e);
        console.log(e);
      } else {
        res.send(newEntry);
      }
    });
  };

  // =========
  // Read many
  // =========
  const readMany = (req, res) => {
    const { query } = req;

    Collection.find(query, (e, result) => {
      if (e) {
        res.status(500).send(e);
        console.log(e);
      } else {
        res.send(result);
      }
    });
  };

  // ========
  // Read one
  // ========
  const readOne = (req, res) => {
    const { _id } = req.params;
    const { populate } = req.query;

    Collection.findById(_id, (e, result) => {
      if (e) {
        res.status(500).send(e);
        console.log(e);
      } else {
        res.send(result);
      }
    }).populate(populate);
  };

  // ======
  // Update
  // ======
  const update = (req, res) => {
    const changedEntry = req.body;

    Collection.update({ _id: req.params._id }, { $set: changedEntry }, e => {
      if (e) {
        res.status(500).send(e);
        console.log(e);
      } else {
        res.sendStatus(200);
      }
    });
  };

  // ======
  // Remove
  // ======
  const remove = (req, res) => {
    Collection.remove({ _id: req.params._id }, e => {
      if (e) res.status(500).send(e);
      else res.sendStatus(200);
    });
  };

  // ======
  // Routes
  // ======

  let router = express.Router();

  router.post("/", create);
  router.get("/", readMany);
  router.get("/:_id", readOne);
  router.put("/:_id", update);
  router.delete("/:_id", remove);

  return router;
};
