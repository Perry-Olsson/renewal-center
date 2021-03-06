import React from "react";
import { Button } from "../../../../components";
import { useStaticState } from "../../context";
import { useDay } from "../../Day/context/DayProvider";

export const CreateAppointment: React.FC<CreateAppointmentProps> = ({
  handleClick,
  className,
}) => {
  const day = useDay();
  const { serviceHours } = useStaticState();
  if (
    day &&
    serviceHours.data.length &&
    serviceHours.data[day.getDay()].isClosed
  )
    return null;

  return (
    <Button handleClick={handleClick} text="Book Now" className={className} />
  );
};

interface CreateAppointmentProps {
  handleClick: () => void;
  className?: string;
}
