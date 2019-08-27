require("dotenv").config();

const mongoose = require("mongoose");
const Comment = require("../server/models/comment");

const testComment = "Now is the time for a good test!";

describe("comments", () => {
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
      Comment.create({
        content: testComment,
        owner: mongoose.Types.ObjectId(),
        listing: mongoose.Types.ObjectId(),
        group: mongoose.Types.ObjectId()
      })
    ).resolves.toEqual(
      expect.objectContaining({
        content: testComment,
        created: expect.any(Date)
      })
    );
  });

  it("find", () => {
    return expect(Comment.findOne({ content: testComment })).resolves.toEqual(
      expect.objectContaining({
        content: testComment,
        created: expect.any(Date)
      })
    );
  });
});
