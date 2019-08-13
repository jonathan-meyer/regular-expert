const express = require("express");
const { graphql, buildSchema } = require("graphql");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello API World!" });
});

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  }
};

router.get("/hello", (req, res) => {
  // Run the GraphQL query '{ hello }' and print out the response
  graphql(schema, "{ hello }", root).then(response => {
    res.json(response);
  });
});

module.exports = router;
