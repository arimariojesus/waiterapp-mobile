import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { Text } from '../Text';

import * as S from './styles';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export const Header = ({ selectedTable, onCancelOrder }: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <S.Container>
      {!selectedTable ? (
        <>
          <Text size={14} opacity={0.9}>
            Bem-vindo(a) ao
          </Text>
          <Text size={24} weight="700">
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      ) : (
        <S.Content>
          <S.OrderHeader>
            <Text size={24} weight="600">
              Pedido
            </Text>

            <TouchableOpacity onPress={onCancelOrder}>
              <Text color={theme.color.primary} weight="600" size={14}>
                cancelar pedido
              </Text>
            </TouchableOpacity>
          </S.OrderHeader>

          <S.Table>
            <Text color={theme.color.grey}>Mesa {selectedTable}</Text>
          </S.Table>
        </S.Content>
      )}
    </S.Container>
  );
};
