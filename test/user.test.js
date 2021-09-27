const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/model/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Fosrx9",
  email: "frostx9@gmail.com",
  password: "56what!!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should Signup a new user", async () => {
  await request(app)
    .post("/user")
    .send({
      name: "Saumya",
      email: "saumya@gmail.com",
      password: "MyPasss777",
    })
    .expect(200);
});

test("Should Login", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "frostx9@gmail.com",
      password: "56what!!",
    })
    .expect(200);
});

test("Should not Login", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: "56whatfdf!!",
    })
    .expect(400);
});

test("Should get profile", async () => {
  await request(app)
    .get("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should be avatar upload", async () => {
  await request(app)
    .post("/user/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "test/fixtures/Call.jpg")
    .expect(200);
});
