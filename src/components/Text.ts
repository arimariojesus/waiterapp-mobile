import styled from 'styled-components/native';

interface TextProps {
  weight?: '400' | '600' | '700';
  color?: string;
  size?: number;
  opacity?: number;
}

export const Text = styled.Text<TextProps>`
  font-family: ${({ weight = '400' }) => `GeneralSans-${weight}`};
  color: ${({ color = '#333' }) => color};
  font-size: ${({ size = 16 }) => `${size}px`};
  opacity: ${({ opacity = 1 }) => opacity};
`;
