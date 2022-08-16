import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../../layout/style';

export const DetailsContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px 0;
  align-items: flex-start;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    padding: 20px ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;
export const ProfilePicture = styled.img`
  border-radius: 50%;
`;
export const Details = styled.div`
  width: 100%;
`;

export const DetailsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 48px;
  align-items: center;
  margin-bottom: 20px;
`;
export const UsernameAndSubsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Username = styled.a`
  color: ${(props) => props.theme.textColor};
`;
export const SubCount = styled.small`
  color: ${(props) => props.theme.textMutedColor};
`;
export const SubscribeBtn = styled.button`
  padding: 10px 16px;
  text-transform: uppercase;
  color: white;
  background-color: ${(props) => props.theme.subscribeBtn.subBg};
  border-radius: 2px;
`;
export const Description = styled.p`
  color: ${(props) => props.theme.textColor};
  line-height: 20px;
  max-width: 600px;
`;
