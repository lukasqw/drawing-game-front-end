import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;
      background: string;
      backgroundSecondary: string;
      border: string;
      gradient: {
        primary: string;
        secondary: string;
      };
      text: string;
      shadow: string;
    }
  }
}
