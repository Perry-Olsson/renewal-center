import { useAtom } from "jotai";
import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import { device } from "../../../../../components/device";
import { QUARTER_HOUR } from "../../../../../constants";
import { Appointment } from "../../../../../types";
import { dimensionsAtom } from "../../../atoms";
import { TimeSlot } from "./TimeSlot";

export const TimeSlotList: React.FC<TimeSlotsProps> = memo(
  ({ day, appointments }) => {
    const timeSlots = useMemo(() => computeTimeSlots(day), [day]);
    const [{ height }] = useAtom(dimensionsAtom);

    let index = 0;
    return (
      <Container height={height}>
        {timeSlots.map(slot => {
          if (slot.valueOf() === appointments[index]?.end.valueOf()) index++;
          return (
            <TimeSlot
              key={slot.valueOf()}
              timeSlot={slot}
              appointment={appointments[index]}
            />
          );
        })}
      </Container>
    );
  },
  (prev, next) => {
    return (
      prev.day.valueOf() === next.day.valueOf() &&
      prev.appointments === next.appointments
    );
  }
);

interface TimeSlotsProps {
  day: Date;
  appointments: Appointment[];
}

const Container = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ theme, height }) => `${height - theme.dayView.headerOffset}px`};
  overflow-y: auto;
  @media (max-width: ${device.desktop.pixels}) {
    grid-column: 1 / 4;
    max-width: ${device.tablet.pixels};
    margin: auto;
  }
`;

const computeTimeSlots = (day: Date): Date[] => {
  const timeSlots: Date[] = [];
  let currentTime = day;
  while (currentTime.getDate() === day.getDate()) {
    timeSlots.push(currentTime);
    currentTime = new Date(currentTime.valueOf() + QUARTER_HOUR);
  }
  return timeSlots;
};
