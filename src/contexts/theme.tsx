import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const toggleTheme = React.useCallback(async () => {
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

  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem('waiterapp@theme');
      if (storedTheme) {
        const theme = storedTheme === 'dark' ? 'dark' : 'light';
        setCurrentTheme(theme);
      }
    })();
  }, [currentScheme]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('waiterapp@theme', currentTheme);
    })();
  }, [currentTheme]);

  return (
    <ThemeProvider theme={memorizedValue.theme}>
      <AppThemeContext.Provider value={memorizedValue}>
        {children}
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
};
