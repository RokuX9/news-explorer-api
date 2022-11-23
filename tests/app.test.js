const mongoose = require("mongoose");
const supertest = require("supertest");
const validator = require("validator");
const app = require("../routes/app");

const request = supertest(app);

const mockUser = {
  email: "test@gmail.com",
  password: "12345678",
  name: "Test",
};
const mockArticle = {
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

describe("Test valid requests", () => {
  let articleId;
  let token;

  it("Should create a new user", (done) => {
    request
      .post("/signup")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(mockUser)
      .then((res) => {
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toMatchObject({
          email: mockUser.email,
          name: mockUser.name,
        });
        done();
      });
  });
  it("Should check email and password, and return JWT", (done) => {
    request
      .post("/signin")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ email: mockUser.email, password: mockUser.password })
      .then((res) => {
        const data = JSON.parse(res.text);
        token = data.token;
        expect(res.status).toBe(200);
        expect(validator.isJWT(data.token)).toBeTruthy();
        done();
      });
  });
  it("Should return the logged user info", (done) => {
    request
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toMatchObject({
          name: mockUser.name,
          email: mockUser.email,
          __v: 0,
        });
        done();
      });
  });
  it("Should create a new article", (done) => {
    request
      .post("/articles")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(mockArticle)
      .then((res) => {
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        expect(data).toMatchObject(mockArticle);
        done();
      });
  });
  it("Should return the articles saved by the user", (done) => {
    request
      .get("/articles")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        expect(data[0].keyword).toBe(mockArticle.keyword);
        articleId = data[0]._id;
        done();
      });
  });
  it("Should delete the article with the given ObjectID", (done) => {
    request
      .delete(`/articles/${articleId}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        const data = JSON.parse(res.text);
        expect(data.keyword).toBe(mockArticle.keyword);
        done();
      });
  });
});
