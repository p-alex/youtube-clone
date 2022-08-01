import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    siteBg: string;
    uiBg: string;
    textColor: string;
    textMutedColor: string;
    btnBg: string;
    btnHoverBg: string;
    borderColor: string;
    inputBg: string;
    hrColor: string;
  }
}
