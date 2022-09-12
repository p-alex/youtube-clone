import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    siteBg: string;
    uiBg: string;
    textColor: string;
    textMutedColor: string;
    borderColor: string;
    inputBg: string;
    hrColor: string;
    accentColor: string;
    primaryBtn: {
      bg: string;
      bgHover: string;
      textColor: string;
    };
    normalBtn: {
      bg: string;
      bgHover: string;
      textColor: string;
    };
    dangerBtn: {
      bg: string;
      bgHover: string;
      textColor: string;
    };
    listButton: {
      bgHover: string;
    };
  }
}
