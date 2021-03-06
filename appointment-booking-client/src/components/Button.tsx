import React from "react";
import styled from "styled-components";
import { theme } from "./theme";

export const LinkButton = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { text, className, negative, hexColor = theme.colors.primary, ...props },
    ref
  ) => {
    return (
      <BaseAnchor
        ref={ref}
        className={className}
        color={hexColor}
        negative={negative || false}
        {...props}
      >
        {text}
      </BaseAnchor>
    );
  }
);

const BaseAnchor = styled.a<{ color: string; negative: boolean }>`
  @media (hover: hover) {
    &:hover {
      border: solid 2px ${({ color }) => `${color}00`};
      background-color: ${({ theme, color, negative }) =>
        negative ? theme.colors.primaryMisted : `${color}bb`};
    }
  }
  width: fit-content;
  height: fit-content;
  padding: 10px;
  background-color: ${({ color, negative }) => (negative ? "white" : color)};
  border: solid 2px ${({ color }) => color};
  border-radius: 5px;
  color: ${({ color, negative }) => (negative ? color : "white")};
  font-size: ${({ theme }) => theme.font.sm};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  handleClick,
  text,
  className,
  negative,
  hexColor = theme.colors.primary,
  ...props
}) => {
  return (
    <BaseButton
      onClick={handleClick}
      className={className}
      color={hexColor}
      negative={negative || false}
      {...props}
    >
      {text}
    </BaseButton>
  );
};

const BaseButton = styled.button<{ color: string; negative: boolean }>`
  @media (hover: hover) {
    &:hover {
      border: solid 2px ${({ color }) => `${color}00`};
      background-color: ${({ theme, color, negative }) =>
        negative ? theme.colors.primaryMisted : `${color}bb`};
    }
  }
  width: fit-content;
  height: fit-content;
  padding: 10px;
  background-color: ${({ color, negative }) => (negative ? "white" : color)};
  border: solid 2px ${({ color }) => color};
  border-radius: 5px;
  color: ${({ color, negative }) => (negative ? color : "white")};
  font-size: ${({ theme }) => theme.font.sm};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: () => void;
  text: string;
  className?: string;
  hexColor?: string;
  negative?: boolean;
}

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  className?: string;
  hexColor?: string;
  negative?: boolean;
}
