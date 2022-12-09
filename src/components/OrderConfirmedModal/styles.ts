import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.color.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
  margin-top: 24px;
  padding: 14px 24px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 48px;
`;
