require("dotenv").config();

const axios = require("axios");
const redis = require("redis");

const client = redis.createClient(process.env.REDIS_URL);
const headers = {
  "x-rapidapi-host": "realtor.p.rapidapi.com",
  "x-rapidapi-key": process.env.RAPIDAPI_KEY
};

client.on("connect", () => {
  console.log(`Connected to Redis`);
});

client.on("error", err => {
  console.log(`Redis Error: ${err}`);
});

const detail = (property_id, listing_id, prop_status = "for_sale") => {
  const params = { prop_status, listing_id, property_id };
  const key = `detail:${property_id}:${listing_id}:${prop_status}`;

  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) reject(err);
      else {
        if (value) {
          resolve(JSON.parse(value));
        } else {
          axios
            .get("https://realtor.p.rapidapi.com/properties/detail", {
              headers,
              params
            })
            .then(res => res.data)
            .then(data => {
              client.set(key, JSON.stringify(data), (err, result) => {
                if (err) reject(err);
                else resolve(data);
              });
            });
        }
      }
    });
  });
};

const listForSale = (
  city,
  state_code,
  radius = 5,
  sort = "relevance",
  offset = 0,
  limit = 10
) => {
  const params = { sort, radius, city, offset, limit, state_code };
  const key = `listForSale:${[
    "city",
    "state_code",
    "radius",
    "sort",
    "limit",
    "offset"
  ]
    .map(i => `${params[i]}`.toLowerCase())
    .join(":")}`;

  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) reject(err);
      else {
        if (value) {
          resolve(JSON.parse(value));
        } else {
          axios
            .get("https://realtor.p.rapidapi.com/properties/list-for-sale", {
              headers,
              params
            })
            .then(res => res.data)
            .then(data => {
              client.set(key, JSON.stringify(data), (err, result) => {
                if (err) reject(err);
                else resolve(data);
              });
            });
        }
      }
    });
  });
};

const autoComplete = input => {
  const params = { input };
  const key = `autoComplete:${input.replace(":", "_").toLowerCase()}`;

  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) reject(err);
      if (value) {
        resolve(JSON.parse(value));
      } else {
        axios
          .get("https://realtor.p.rapidapi.com/locations/auto-complete", {
            headers,
            params
          })
          .then(res => res.data)
          .then(data => {
            client.set(key, JSON.stringify(data), (err, result) => {
              if (err) reject(err);
              else resolve(data);
            });
          });
      }
    });
  });
};

module.exports = {
  detail,
  listForSale,
  autoComplete
};
