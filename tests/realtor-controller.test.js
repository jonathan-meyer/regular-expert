const axios = require("axios");
const redis = require("redis");

const realtor = require("../controllers/realtor");

jest.mock("axios");
jest.mock("redis", () => ({
  createClient: jest.fn(() => ({
    on: jest.fn((ev, cb) => {}),
    get: jest.fn((key, cb) => {
      cb(null, null);
    }),
    set: jest.fn((key, value, cb) => {
      cb(null, "OK");
    })
  }))
}));

describe("Realtor Controller", () => {
  axios.get.mockImplementation((url, options) => {
    return Promise.resolve({ data: { url, options } });
  });

  it("autoComplete", () => {
    return expect(realtor.autoComplete("Earth")).resolves.toEqual(
      expect.objectContaining({
        url: "https://realtor.p.rapidapi.com/locations/auto-complete",
        options: expect.objectContaining({ params: { input: "Earth" } })
      })
    );
  });

  it("listForSale", () => {
    return expect(realtor.listForSale("Earth", "TX")).resolves.toEqual(
      expect.objectContaining({
        url: "https://realtor.p.rapidapi.com/properties/list-for-sale",
        options: expect.objectContaining({
          params: expect.objectContaining({ city: "Earth", state_code: "TX" })
        })
      })
    );
  });

  it("detail", () => {
    return expect(realtor.detail(123, 321)).resolves.toEqual(
      expect.objectContaining({
        url: "https://realtor.p.rapidapi.com/properties/detail",
        options: expect.objectContaining({
          params: expect.objectContaining({ property_id: 123, listing_id: 321 })
        })
      })
    );
  });
});
