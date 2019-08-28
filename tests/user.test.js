require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../server/models/user");

const testUser = {
  firstName: "Fred",
  lastName: "Flintstone",
  email: "no@this.time",
  password: "Open Sesame"
};

describe("Users", () => {
  beforeEach(() => {
    return mongoose.connect(process.env.MONGODB_TEST_URI, {
      useNewUrlParser: true
    });
  });

  afterEach(() => {
    return mongoose.disconnect();
  });

  it("create", () => {
    return expect(User.create(testUser)).resolves.toEqual(
      expect.objectContaining({
        ...testUser,
        createdAt: expect.any(Date)
      })
    );
  });

  it("find", () => {
    return expect(User.findOne(testUser)).resolves.toEqual(
      expect.objectContaining(testUser)
    );
  });
});
