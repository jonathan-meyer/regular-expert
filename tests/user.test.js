require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../server/models/user");
const crypto = require("crypto");

// create a random password
const password = crypto.randomBytes(10).toString("hex");

// create a random username
const username = crypto.randomBytes(10).toString("hex");

const testUser = {
  firstName: "Fred",
  lastName: "Flintstone"
};

describe("Users", () => {
  beforeAll(() => {
    return mongoose.connect(process.env.MONGODB_TEST_URI, {
      useNewUrlParser: true
    });
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  it("create without password", () => {
    return expect(User.create({ ...testUser, username })).rejects.toEqual(
      expect.objectContaining({
        errors: expect.objectContaining({
          password: expect.objectContaining({
            message: expect.stringContaining("Password is required.")
          })
        })
      })
    );
  });

  it("create", () => {
    return expect(
      User.create({ ...testUser, username, password })
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

  it("login", () => {
    return User.findOne({ username }).then(data => {
      expect(data.checkPassword(password)).toEqual(true);
    });
  });
});
