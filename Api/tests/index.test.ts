import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { app } from "../src/app";

const api = request(app);
const prisma = new PrismaClient();

describe("Server starts sucdessfully", () => {
  test("Connects to Database", async () => {
    await prisma.$connect();
    return await prisma.$disconnect();
  });

  test("ping endpoint pongs", async () => {
    const response = await api.get("/api/ping");
    expect(response.status).toBe(200);
    expect(response.text).toBe("pong");
  });

  test("Unknown endpoint returns correct error response", async () => {
    const response = await api.get("/api/thisdoesnotexist");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Unknown endpoint" });
  });
});
