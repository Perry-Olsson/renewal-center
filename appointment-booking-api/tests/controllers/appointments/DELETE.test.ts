import request from "supertest";
import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import {
  createTestAppointment,
  initializeTestData,
  PushToDbError,
} from "../../helpers";

const api = request(app);

beforeAll(async () => {
  await initializeTestData();
});

afterAll(() => prisma.$disconnect());

describe("DELETE request", () => {
  test("request to /api/appointments/:timestamp successfully deletes an appointment", async () => {
    const { appointment } = await createTestAppointment({ pushToDb: true });
    if (!appointment) throw new PushToDbError();

    const response = await api.delete(
      `/api/appointments/${appointment.timestamp.toJSON()}`
    );

    expect(response.status).toBe(204);

    const deletedAppointment = await prisma.appointment.findUnique({
      where: { timestamp: appointment.timestamp },
    });

    expect(deletedAppointment).toBe(null);
  });
});
