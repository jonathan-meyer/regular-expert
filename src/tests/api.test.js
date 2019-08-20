import axios from "axios";
import api from "../utils/API";

jest.mock("axios");

describe("react listings api", () => {
  axios.get.mockImplementation((url, options) => {
    return Promise.resolve({ url, options });
  });

  it("search listings", () =>
    expect(api.searchListings("Earth")).resolves.toEqual(
      expect.objectContaining({
        url: "/api/search",
        options: { params: { q: "Earth" } }
      })
    ));

  it("detailed listing", () =>
    expect(api.listingDetails(123, 321)).resolves.toEqual(
      expect.objectContaining({
        url: "/api/listing/123/321"
      })
    ));
});
