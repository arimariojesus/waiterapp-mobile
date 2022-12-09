import { Modal } from 'react-native';

import { useTheme } from '../../hooks';
import { CheckCircle } from '../Icons';
import { Text } from '../Text';

import * as S from './styles';

interface OrderConfirmedModalProps {
  visible: boolean;
  onConfirm: () => void;
}

export const OrderConfirmedModal = ({
  visible,
  onConfirm,
}: OrderConfirmedModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} animationType="fade">
      <S.Container>
        <CheckCircle />

        <Text
          size={20}
          weight="600"
          color={theme.color.white}
          style={{ marginTop: 12 }}
        >
          Pedido confirmado
        </Text>
        <Text color={theme.color.white} opacity={0.8} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <S.ConfirmButton onPress={onConfirm}>
          <Text weight="600" color={theme.color.primary}>
            OK
          </Text>
        </S.ConfirmButton>
      </S.Container>
    </Modal>
  );
};
