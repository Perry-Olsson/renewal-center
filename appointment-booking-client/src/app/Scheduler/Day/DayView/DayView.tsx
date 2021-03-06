import { useAtom } from "jotai";
import React, { memo } from "react";
import styled from "styled-components";
import { Flex, StyledTimezoneMessage } from "../../../../components";
import { device } from "../../../../components/device";
import { Appointment } from "../../../../types";
import { AppointmentForm } from "../../AppointmentForm";
import { dimensionsAtom } from "../../atoms";
import { ServiceHoursState } from "../../hooks";
import { AppointmentProvider } from "../context";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MonthCard } from "./MonthCard";
import { TimeSlotList } from "./TimeSlots";
import { appointmentsAreEqual } from "./TimeSlots/utils/appointmentsAreEqual";

export const DayView: React.FC<DayViewProps> = memo(
  ({ day, serviceHours, timeSlots, appointments }) => {
    const [{ width }] = useAtom(dimensionsAtom);
    const isDesktop = device.isLargeDesktop(width);

    return (
      <AppointmentProvider value={appointments}>
        <Container>
          <Header />
          <Grid>
            {isDesktop ? <MonthCard day={day} /> : null}
            <TimeSlotList
              timeSlots={timeSlots}
              serviceHours={serviceHours.data[day.getDay()]}
              day={day}
            />
            <AppointmentForm timeSlots={timeSlots} />
          </Grid>
          {!isDesktop ? <Footer /> : null}
        </Container>
        <StyledTimezoneMessage />
      </AppointmentProvider>
    );
  },
  (prev, next) =>
    prev.day.valueOf() === next.day.valueOf() &&
    appointmentsAreEqual(prev, next)
);

const Container = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  height: ${({ theme }) =>
    `${window.innerHeight - theme.dayView.headerOffset}px`};
  @media (min-width: ${device.desktop.largePixels}) {
    border-top: solid 1px #90909090;
    padding-top: 20px;
  }
  @media (max-width: ${device.desktop.largePixels}) {
    height: ${({ theme }) =>
      `${
        window.innerHeight -
        theme.dayView.headerOffset -
        theme.dayView.footerOffset
      }px`};
  }
`;

export interface DayViewProps {
  day: Date;
  appointments: Appointment[];
  timeSlots: Date[];
  serviceHours: ServiceHoursState;
}
