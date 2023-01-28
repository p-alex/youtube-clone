import styled from 'styled-components';

export const Footer__Container = styled.footer`
  position: relative;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  margin-top: auto;

  & span {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const Footer__Socials = styled.div`
  display: flex;
  gap: 5px;
`;

export const Footer__SocialLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    font-size: 2.2rem;
    color: ${(props) => props.theme.textMutedColor};
    transition: color 150ms ease-in-out;
  }
  &:hover svg {
    color: ${(props) => props.theme.textColor};
  }
`;
