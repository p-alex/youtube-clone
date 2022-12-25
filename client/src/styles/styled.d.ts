import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    siteBg: string;
    uiBg: string;
    uiSecondaryBg: string;
    textColor: string;
    textMutedColor: string;
    borderColor: string;
    inputBg: string;
    hrColor: string;
    accentColor: string;
    errorColor: string;
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
    subscribeBtn: {
      bg: string;
      bgHover: string;
      textColor: string;
      subedBg: string;
      subedBgHover: string;
      subedTextColor: string;
    };
  }
}
