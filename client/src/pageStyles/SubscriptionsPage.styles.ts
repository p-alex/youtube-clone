import styled from 'styled-components';

export const SubscriptionsPage__Container = styled.section`
  position: relative;
  max-width: 1750px;
  margin: auto;
  gap: 20px;
  @media (max-width: 1780px) {
    width: calc(100% - 40px);
    margin: 0 20px;
  }
`;

export const SubscriptionsPage__Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 40px;
`;
