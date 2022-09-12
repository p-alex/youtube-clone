import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { RootState } from "../app/store";
import NavBar from "../components/navBar/NavBar";
import useAuth from "../hooks/useAuth";
import { GlobalStyle } from "../styles/global";

const lightTheme = {
  siteBg: "#efefef",
  uiBg: "#ffffff",
  textColor: "#0c161e",
  textMutedColor: "#959495",
  borderColor: "#d2d2d2",
  inputBg: "#fefeff",
  hrColor: "silver",
  accentColor: "#3ea6ff",
  primaryBtn: {
    bg: "#3ea6ff",
    bgHover: "#5db4ff",
    textColor: "#111",
  },
  normalBtn: {
    bg: "#d9d9d9",
    bgHover: "#c7c7c7",
    textColor: "#0c161e",
  },
  dangerBtn: {
    bg: "#fe0001",
    bgHover: "#ff3434",
    textColor: "#fffeff",
  },
  listButton: {
    bgHover: "#e1e0e0",
  },
};

const darkTheme = {
  siteBg: "#181919",
  uiBg: "#202020",
  textColor: "#fffeff",
  textMutedColor: "#8a8a8a",
  borderColor: "#343534",
  inputBg: "#121213",
  hrColor: "#333",
  accentColor: "#3ea6ff",
  primaryBtn: {
    bg: "#3ea6ff",
    bgHover: "#5db4ff",
    textColor: "#111",
  },
  normalBtn: {
    bg: "#313031",
    bgHover: "#3b3a3b",
    textColor: "#fffeff",
  },
  dangerBtn: {
    bg: "#fe0001",
    bgHover: "#ff3434",
    textColor: "#fffeff",
  },
  listButton: {
    bgHover: "#3b3a3b",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { isAuth } = useAuth();
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      {isAuth && <NavBar />}
      {children}
    </ThemeProvider>
  );
};

export default Layout;
