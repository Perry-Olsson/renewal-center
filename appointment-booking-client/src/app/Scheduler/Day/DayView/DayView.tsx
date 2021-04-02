import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";
import { device } from "../../../../components/device";
import { Appointment } from "../../../../types";
import { dimensionsAtom } from "../../atoms";
import { Header } from "./Header";
import { MonthCard } from "./MonthCard";
import { TimeSlotList } from "./TimeSlots";

export const DayView: React.FC<DayProps> = ({ day, appointments }) => {
  const [{ width }] = useAtom(dimensionsAtom);

  return (
    <Container>
      <Header day={day} />
      <Grid>
        {device.isDesktop(width) ? <MonthCard day={day} /> : null}
        <TimeSlotList day={day} appointments={appointments} />
      </Grid>
    </Container>
  );
};

interface DayProps {
  appointments: Appointment[];
  day: Date;
}

const Container = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
`;
