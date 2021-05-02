import styled from "styled-components";
import { theme } from "./theme";

export const Button: React.FC<ButtonProps> = ({
  handleClick,
  text,
  className,
  negative,
  hexColor = theme.colors.primaryLight,
}) => {
  return (
    <BaseButton
      onClick={handleClick}
      className={className}
      color={hexColor}
      negative={negative || false}
    >
      {text}
    </BaseButton>
  );
};

const BaseButton = styled.button<{ color: string; negative: boolean }>`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  background-color: ${({ color, negative }) => (negative ? "white" : color)};
  border-radius: 5px;
  color: ${({ color, negative }) => (negative ? color : "white")};
  font-size: ${({ theme }) => theme.font.sm};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme, color, negative }) =>
        negative ? theme.colors.primaryMisted : `${color}bb`};
    }
  }
`;

interface ButtonProps {
  handleClick?: () => void;
  type?: string;
  text: string;
  className?: string;
  hexColor?: string;
  negative?: boolean;
}
