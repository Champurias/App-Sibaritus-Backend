import mongoose from "mongoose";
import request from "supertest";

import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import connectToDataBase from "../../database/index.js";
import User from "../../database/models/users/User.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  await connectToDataBase(server.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();

  await server.stop();
});

const registerUser = {
  username: "hulio",
  password: "1234567",
  email: "hulio@gmail.com",
};

describe("Given a Post method /users/register endpoint", () => {
  describe("When it receives a requeste with usursname 'pirrin' password '1234567' and email 'hulio@gmail.com'", () => {
    test("When it should call the response method status 201 and create new user 'hulio'", async () => {
      const expectedStatus = 201;
      const expectedMessage = { message: `${registerUser.username} registred` };

      const response = await request(app)
        .post("/users/register")
        .send(registerUser)
        .expect(expectedStatus);

      expect(response.body).toStrictEqual(expectedMessage);
    });
  });
  describe("When it receives a request username 'hulio' and this username exists in the database ", () => {
    test("Then it should respond with a response status 500, and the message 'General Error'", async () => {
      const expectedStatus = 500;

      await User.create(registerUser);

      const response = await request(app)
        .post("/users/register/")
        .send(registerUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", "General error");
    });
  });
});
