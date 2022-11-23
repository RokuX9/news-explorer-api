const mongoose = require("mongoose");
const User = require("../models/user.js");
const Article = require("../models/article.js");

let mockUser = {
  email: "test@gmail.com",
  password: "12345678",
  name: "Test",
};
let mockArticle = {
  keyword: "test",
  title: "How to test",
  text: "lorem ipsom",
  date: "10-11-2022",
  source: "The Onion",
  link: "https://www.theonion.com/",
  image:
    "https://m.media-amazon.com/images/M/MV5BNDdkMDUxMmUtNWQ1Yi00OWY3LWI2ZDktOTBmNzVkMTAwODM5XkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_.jpg",
};

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/mockdb");
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close();
    done();
  });
});

describe("Test schema structure", () => {
  let ownerId;
  it("Should create a new user", (done) => {
    User.create(mockUser).then((res) => {
      ownerId = res._id;
      expect(res).toMatchObject({
        email: mockUser.email,
        name: mockUser.name,
        password: mockUser.password,
        __v: 0,
        _id: res._id,
      });
      done();
    });
  });

  it("Should Create a new article", () => {
    Article.create({ ...mockArticle, owner: ownerId }).then((article) => {
      expect(article).toMatchObject({
        ...mockArticle,
        _id: article._id,
        owner: ownerId,
        __v: 0,
      });
    });
  });
});

describe("Test schema validation", () => {
  it("Invalid email in User table", () => {
    User.create({ ...mockUser, email: "invalid" }).catch((err) => {
      expect(err.name).toBe("ValidationError");
    });
  });
  it("Invalid source in Article table", () => {
    Article.create({ ...mockArticle, source: "invalid" }).catch((err) => {
      expect(err.name).toBe("ValidationError");
    });
  });
  it("Invalid image in Article table", () => {
    Article.create({ ...mockArticle, image: "invalid" }).catch((err) => {
      expect(err.name).toBe("ValidationError");
    });
  });
});
