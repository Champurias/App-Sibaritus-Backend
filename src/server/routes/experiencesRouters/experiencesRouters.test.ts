import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDataBase from "../../../database";
import app from "../../app";
import { Experience } from "../../../database/models/users/Experience";

let server: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

beforeEach(async () => {
  await Experience.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a Get/experince/list/ endpoint", () => {
  describe("When it receives a request with an empty body two experience in database ", () => {
    test("Then it should respond a 200 status", async () => {
      const status = 200;

      const response = await request(app)
        .get("/experience/list")
        .expect(status);

      expect(response.body).toHaveProperty("experience");
    });
  });
});
