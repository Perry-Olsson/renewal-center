import request from "supertest";
import { Appointment } from "@prisma/client";

import { app } from "../../../src/app";
import { prisma } from "../../../src/prisma";
import { initializeAppointments } from "../../helpers/initalizeDb";
import {
  parseRawAppointment,
  appointmentsAreSorted,
  filterUnwantedMonths,
  createAppointmentsOneYearApart,
  deleteAppointmentsOneYearApart,
} from "./helpers";

const api = request(app);

beforeAll(async () => {
  await initializeAppointments();
});

afterAll(() => prisma.$disconnect());

describe("GET request", () => {
  test("Request to /api/appointments returns appointments", async () => {
    const appointmentsFromDb = await prisma.appointment.findMany({
      orderBy: { timestamp: "asc" },
    });
    const response = await api.get("/api/appointments");
    const appointments: Appointment[] = response.body.map((app: any) =>
      parseRawAppointment(app)
    );

    expect(response.status).toBe(200);
    expect(appointments).toHaveLength(appointmentsFromDb.length);
    expect(parseRawAppointment(appointments[0])).toEqual(appointmentsFromDb[0]);
    expect(appointmentsAreSorted(appointments)).toBe(true);
  });

  describe("Query string request", () => {
    test("Request with query string returns correct appointments", async () => {
      const now = new Date();

      const appointmentsFromDb = await prisma.appointment.findMany({
        where: { month: now.getMonth(), year: now.getFullYear() },
      });

      const response = await api.get(
        `/api/appointments/?month=${now.getMonth()}&year=${now.getFullYear()}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(appointmentsFromDb.length);
    });

    test("Query string with month and no year", async () => {
      const { id1, id2, month, year } = await createAppointmentsOneYearApart();

      const appointmentsFromDb = await prisma.appointment.findMany({
        where: {
          month,
          year,
        },
      });

      const response = await api.get(`/api/appointments/?month=${month}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(appointmentsFromDb.length);

      const appointments: Appointment[] = response.body.map((app: any) =>
        parseRawAppointment(app)
      );

      //Does not return month from past years unless explicitly requested
      expect(filterUnwantedMonths(appointments, month, year)).toHaveLength(
        appointmentsFromDb.length
      );

      await deleteAppointmentsOneYearApart({ id1, id2 });
    });
  });
});