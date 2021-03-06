import React, { FC } from "react";
import styled from "styled-components";
import {
  AppointmentTime,
  ExitButton,
  Flex,
  LoadingIcon,
  SuccessMark,
} from "../../../../components";
import { AppointmentInfoItem } from "./AppointmentInfoItem";
import { ConfirmModalProps } from ".";
import { Cancel, ButtonContainer, ConfirmButton } from "../components";

export const ModalContent: FC<ConfirmModalProps> = ({
  closeModal,
  procedure,
  provider,
  time,
  handleSubmit,
  comments,
  createAppointment,
}) => {
  if (createAppointment.isLoading)
    return (
      <LoadingContainer>
        <ExitButton size="30px" onClick={() => closeModal()} />
        <LoadingIcon />
      </LoadingContainer>
    );
  if (createAppointment.isSuccess)
    return (
      <SuccessContainer>
        <ExitButton size="30px" onClick={() => closeModal()} />
        <h1>Your appointment has been booked!</h1>
        <SuccessMark />
        <h3 style={{ margin: "10px" }}>You can close out of this</h3>
        <Cancel text="Close" negative handleClick={() => closeModal()} />
      </SuccessContainer>
    );
  return (
    <>
      <ExitButton size="30px" onClick={() => closeModal()} />
      <Header>Your Appointment</Header>
      <AppointmentInfoItem title="Procedure">
        {procedure.name}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Provider">
        {provider.firstName} {provider.lastName}
      </AppointmentInfoItem>
      <AppointmentInfoItem title="Time">
        <AppointmentTime time={time} procedure={procedure} />
      </AppointmentInfoItem>
      {comments !== "" ? (
        <AppointmentInfoItem title="Comments" comments>
          {comments}
        </AppointmentInfoItem>
      ) : null}
      <ButtonContainer>
        <Cancel text="cancel" negative handleClick={() => closeModal()} />
        <ConfirmButton
          type="submit"
          text="Submit"
          handleClick={async () => {
            await handleSubmit();
          }}
        />
      </ButtonContainer>
    </>
  );
};

const SuccessContainer = styled(Flex)`
  margin: auto;
  text-align: center;
`;

const LoadingContainer = styled(Flex)`
  margin: auto;
`;

const Header = styled.h1`
  margin: 35px;
`;
