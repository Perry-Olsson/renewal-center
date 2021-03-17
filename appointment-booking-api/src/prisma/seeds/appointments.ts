import { ONE_DAY } from "../../constants";
import { prisma } from "../../prisma";
import { NewAppointment } from "../../types";
import { createNewAppointment } from "./utils";

export async function seedAppointments(appointments: NewAppointment[]) {
  await prisma.appointment.deleteMany();

  for (let i = 0; i < appointments.length; i++) {
    await prisma.appointment.create({ data: appointments[i] });
  }

  await prisma.$disconnect();
}

export const createAppointments = (
  daysWithAppointments = 11,
  appointmentsPerDay = 2
): NewAppointment[] => {
  const appointmentSeeds: NewAppointment[] = [];
  const initialAppointment = createInitialAppointment();
  let previousDay = initialAppointment;

  for (let i = 0; i < daysWithAppointments; i++) {
    const day = new Date(previousDay + ONE_DAY * getRandomNumber(3));
    previousDay = day.valueOf();
    let appointment = day.valueOf();
    for (let i = 0; i < appointmentsPerDay; i++) {
      appointmentSeeds.push(
        createNewAppointment(
          new Date(appointment),
          new Date(appointment + HALF_HOUR * getRandomNumber(2))
        )
      );
      appointment += HOUR * getRandomNumber(2);
    }
  }
  return appointmentSeeds;
};

const createInitialAppointment = () => {
  const today = new Date();
  today.setHours(9);

  const initialAppointmentTimestamp = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours()
  );

  return initialAppointmentTimestamp.valueOf();
};

const getRandomNumber = (upperBound = 10) => {
  return Math.ceil(Math.random() * upperBound);
};

const QUARTER_HOUR = 1000 * 60 * 15;
const HALF_HOUR = QUARTER_HOUR * 2;
const HOUR = HALF_HOUR * 2;
