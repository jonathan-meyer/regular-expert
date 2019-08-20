import axios from "axios";

class API {
  searchListings(query) {
    return axios.get("/search", {
      params: { q: query }
    });
  }

  listingDetails(property_id, listing_id) {
    return axios.get(`/listing/${property_id}/${listing_id}`);
  }
}

export default API;
