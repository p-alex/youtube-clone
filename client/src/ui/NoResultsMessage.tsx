import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const NoResultsMessage__Container = styled.div`
  position: relative;
  max-width: 250px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const NoResultsMessage__Message = styled.p`
  color: ${(props) => props.theme.textColor};
  text-align: center;
`;

const NoResultsMessage = ({ message = 'No results...' }: { message?: string }) => {
  return (
    <NoResultsMessage__Container>
      <Image src="/svg/no-results.svg" width={124} height={140} alt="" />
      <NoResultsMessage__Message>{message}</NoResultsMessage__Message>
    </NoResultsMessage__Container>
  );
};

export default NoResultsMessage;
