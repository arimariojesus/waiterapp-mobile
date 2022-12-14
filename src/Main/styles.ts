import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

import { isAndroid } from '../constants';

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};

  flex: 1;
  background: ${({ theme }) => theme.color.background};
`;

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 34px;
`;

export const MenuContainer = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  /* min-height: 110px; */
  background: ${({ theme }) => theme.color.white};
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView``;

export const CenteredContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
