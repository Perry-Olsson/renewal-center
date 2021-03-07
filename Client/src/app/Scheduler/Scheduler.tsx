import { Flex } from "../../components";
import { useGetAppointments } from "../../hooks/useGetAppointments";
import { DaysOfTheWeek } from "./DaysOfTheWeek";
import { MonthList } from "./MonthList";

export default function SchedulerContainer() {
  useGetAppointments();

  return (
    <Flex>
      <DaysOfTheWeek />
      <MonthList />
    </Flex>
  );
}
