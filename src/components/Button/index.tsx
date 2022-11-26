import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';

import * as S from './styles';

interface ButtonProps {
  children: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button = ({ children, onPress, disabled, isLoading }: ButtonProps) => {
  return (
    <S.Container onPress={onPress} disabled={disabled || isLoading}>
      <Text weight="600" color="#fff" opacity={isLoading ? 0 : 1}>
        {children}
      </Text>

      {isLoading && (
        <ActivityIndicator color="#fff" style={{ position: 'absolute' }} />
      )}
    </S.Container>
  );
};
