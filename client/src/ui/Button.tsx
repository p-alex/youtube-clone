import styled from "styled-components";

export const Button = styled.button<{
  variant: "primary" | "normal" | "danger";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background-color: ${(props) =>
    props.variant === "primary"
      ? props.theme.primaryBtn.bg
      : props.variant === "danger"
      ? props.theme.dangerBtn.bg
      : props.theme.normalBtn.bg};
  border-radius: 2px;
  padding: 10px 16px;
  color: ${(props) =>
    props.variant === "primary"
      ? props.theme.primaryBtn.textColor
      : props.variant === "danger"
      ? props.theme.dangerBtn.textColor
      : props.theme.normalBtn.textColor};
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    background-color: ${(props) =>
      props.variant === "primary"
        ? props.theme.primaryBtn.bgHover
        : props.variant === "danger"
        ? props.theme.dangerBtn.bgHover
        : props.theme.normalBtn.bgHover};
  }
`;
