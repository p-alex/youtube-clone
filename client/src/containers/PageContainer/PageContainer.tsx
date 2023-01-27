import React from 'react';
import styled from 'styled-components';
import { MOBILE_BREAK_POINT } from '../../layout/style';

const PageContainer__Container = styled.section<{ width: number }>`
  position: relative;
  max-width: ${(props) => props.width}px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: ${(props) => `${props.width + 40}px`}) {
    padding: 0 25px;
  }
`;

const PageContainer__Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const PageContainer__Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 2rem;
  @media (max-width: 650px) {
    font-size: 1.5rem;
  }
`;

const PageContainer = ({
  width = 1750,
  title,
  children,
}: {
  width?: number;
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <PageContainer__Container width={width}>
      <PageContainer__Header>
        <PageContainer__Title>{title}</PageContainer__Title>
      </PageContainer__Header>
      {children}
    </PageContainer__Container>
  );
};

export default PageContainer;
