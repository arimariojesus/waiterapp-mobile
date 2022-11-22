import { Text } from '../Text';

import * as S from './styles';

export const Header = () => {
  return (
    <S.Container>
      <Text size={14} opacity={0.9}>Bem-vindo(a) ao</Text>
      <Text size={24} weight="700">
        WAITER
        <Text size={24}>APP</Text>
      </Text>
    </S.Container>
  );
};
