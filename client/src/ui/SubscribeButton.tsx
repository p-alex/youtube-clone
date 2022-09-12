import styled from "styled-components";
const subscribeBtn = {
  bg: "#fe0001",
  bgHover: "#ff3434",
  textColor: "#fff",
  unsubBg: "#313131",
  unsubBgHover: "#3b3a3b",
  unsubTextColor: "#a1aba7",
};
export const SubscribeButton = styled.button<{ variant: "sub" | "unsub" }>`
  padding: 10px 16px;
  text-transform: uppercase;
  color: ${(props) =>
    props.variant === "sub"
      ? subscribeBtn.textColor
      : subscribeBtn.unsubTextColor};
  background-color: ${(props) =>
    props.variant === "sub" ? subscribeBtn.bg : subscribeBtn.unsubBg};
  border-radius: 2px;
  &:hover {
    background-color: ${(props) =>
      props.variant === "sub"
        ? subscribeBtn.bgHover
        : subscribeBtn.unsubBgHover};
  }
`;
