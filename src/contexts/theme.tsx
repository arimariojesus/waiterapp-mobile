import React, { createContext, PropsWithChildren, useState } from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { ThemeMode } from '../@types/styled';
import theme from '../styles/theme';

interface AppThemeContextData {
  theme: DefaultTheme;
  currentTheme: ThemeMode;
  toggleTheme: () => void;
}

export const AppThemeContext = createContext<AppThemeContextData | null>(null);

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const currentScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    if (currentScheme) return currentScheme;
    return 'light';
  });

  const toggleTheme = React.useCallback(() => {
    setCurrentTheme(_theme => {
      const newTheme = _theme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  }, []);

  const memorizedValue = React.useMemo(
    () => ({
      currentTheme,
      toggleTheme,
      theme: {
        ...theme,
        mode: currentTheme,
        color: theme.colors[currentTheme],
      },
    }),
    [currentTheme, toggleTheme],
  );

  return (
    <ThemeProvider theme={memorizedValue.theme}>
      <AppThemeContext.Provider value={memorizedValue}>
        {children}
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
};
