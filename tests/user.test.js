require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../server/models/user");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const buf = Buffer.alloc(10);

const testUser = {
  firstName: "Fred",
  lastName: "Flintstone",
  username: `${crypto.randomFillSync(buf).toString("hex")}@this.time`
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
    return expect(
      User.create({ ...testUser, password: "password" })
    ).resolves.toEqual(
      expect.objectContaining({
        ...testUser,
        created: expect.any(Date)
      })
    );
  });

  it("find", () => {
    return expect(User.findOne(testUser)).resolves.toEqual(
      expect.objectContaining(testUser)
    );
  });
});
