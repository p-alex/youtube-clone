import React from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../layout/style';

const VideoDuration__Paragraph = styled.p`
  position: absolute;
  bottom: 4px;
  right: 4px;
  padding: 4px 8px;
  border-radius: ${BORDER_RADIUS_ROUND}px;
  background-color: #111;
  color: white;
  font-size: 0.85rem;
`;

interface Props {
  children: React.ReactNode;
}

const VideoDuration = ({ children }: Props) => {
  return <VideoDuration__Paragraph>{children}</VideoDuration__Paragraph>;
};

export default VideoDuration;
