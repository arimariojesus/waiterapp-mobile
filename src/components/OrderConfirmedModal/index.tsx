import { Modal } from 'react-native';

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
  return (
    <Modal visible={visible} animationType="fade">
      <S.Container>
        <CheckCircle />

        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.8} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <S.ConfirmButton onPress={onConfirm}>
          <Text weight="600" color="#d73035">
            OK
          </Text>
        </S.ConfirmButton>
      </S.Container>
    </Modal>
  );
};
