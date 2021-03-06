import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { LeftArrow, Link } from "../../../../../../components";
import { nowAtom } from "../../../../atoms";
import { useStaticState } from "../../../../context";
import { useHandleUrlParam } from "../../../hooks";
import { NavigatorArrow } from "./components";
import { ArrowProps, NavigationType } from "./types";

export const Previous: React.FC<ArrowProps> = ({ type }) => {
  const [{ today }] = useAtom(nowAtom);
  const day = useHandleUrlParam();
  const { serviceHours } = useStaticState();
  const href =
    type === "day"
      ? day.getPreviousDay().toJSON()
      : day.getPreviousMonth(serviceHours).toJSON();

  const isDisabled = disable(type, day, today);
  return (
    <Link href={href} disable={isDisabled}>
      <Container isDisabled={isDisabled}>
        <LeftArrow />
      </Container>
    </Link>
  );
};

const disable = (type: NavigationType, day: Date, today: Date): boolean => {
  if (type === "day") {
    return day.valueOf() === today.valueOf();
  } else {
    return (
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }
};

const Container = styled(NavigatorArrow)`
  border-right: solid 1px;
  width: 100%;
`;
