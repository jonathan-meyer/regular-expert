import axios from "axios";

const searchListings = query => {
  return axios.get("/api/realtor/search", {
    params: { q: query }
  });
};

const listingDetails = (property_id, listing_id) => {
  return axios.get(`/api/realtor/listing/${property_id}/${listing_id}`);
};

export default {
  searchListings,
  listingDetails
};
