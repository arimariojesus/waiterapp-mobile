import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks';
import { Text } from '../Text';

import * as S from './styles';

interface ButtonProps {
  children: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  onPress,
  disabled,
  isLoading,
}: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <S.Container onPress={onPress} disabled={disabled || isLoading}>
      <Text weight="600" color={theme.color.white} opacity={isLoading ? 0 : 1}>
        {children}
      </Text>

      {isLoading && (
        <ActivityIndicator
          color={theme.color.white}
          style={{ position: 'absolute' }}
        />
      )}
    </S.Container>
  );
};
