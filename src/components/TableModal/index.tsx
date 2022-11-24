import { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { isAndroid } from '../../constants';

import * as S from './styles';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export const TableModal = (props: TableModalProps) => {
  const { visible, onClose, onSave } = props;

  const [table, setTable] = useState('');

  const handleSave = () => {
    onSave(table);
    onClose();
  };

  return (
    <Modal
      transparent visible={visible}
      animationType="fade"
    >
      <S.Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <S.ModalBody>
          <S.Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#664" />
            </TouchableOpacity>
          </S.Header>

          <S.Form>
            <S.Input
              placeholder="Número da mesa"
              placeholderTextColor="#664"
              keyboardType="number-pad"
              onChangeText={setTable}
            />

            <Button
              onPress={handleSave}
              disabled={!table}
            >
              Salvar
            </Button>
          </S.Form>
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  );
};
