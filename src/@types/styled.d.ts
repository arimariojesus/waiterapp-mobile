import 'styled-components';

import theme from '../styles/theme';

export type ThemeMode = 'light' | 'dark';
export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Omit<Theme, 'colors'> {
    mode: ThemeMode;
  }
}
