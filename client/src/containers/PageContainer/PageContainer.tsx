import React from 'react';
import styled from 'styled-components';

const PageContainer__Container = styled.section<{ width: number }>`
  position: relative;
  max-width: ${(props) => props.width}px;
  margin: auto;
  gap: 20px;
  @media (max-width: ${(props) => `${props.width + 40}px`}) {
    padding: 0 25px;
  }
`;

const PageContainer__Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 40px;
  font-size: 2rem;
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
      <PageContainer__Title>{title}</PageContainer__Title>
      {children}
    </PageContainer__Container>
  );
};

export default PageContainer;
