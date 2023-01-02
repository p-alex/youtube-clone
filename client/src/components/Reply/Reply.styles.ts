import styled from 'styled-components';

export const Reply__Container = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 25px;
  border-radius: 5px;
  gap: 15px;
  width: 100%;
`;

export const Reply__ProfilePicture = styled.div`
  width: 35px;
  height: 35px;
  min-width: 35px;
  & img {
    border-radius: 50%;
  }
`;

export const Reply__Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Reply__Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

export const Reply__UsernameAndDate = styled.div``;

export const Reply__Username = styled.div`
  & a {
    color: ${(props) => props.theme.textColor};
  }
`;

export const Reply__Text = styled.p<{ showMoreText: boolean | null }>`
  color: ${(props) => props.theme.textColor};
  white-space: pre-line;
  word-wrap: break-word;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) =>
    props.showMoreText === true ? '0' : props.showMoreText === false ? '4' : '0'};
  overflow: hidden;
`;

export const Reply__Date = styled.small`
  color: ${(props) => props.theme.textMutedColor};
`;

export const Reply__Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

export const Reply__Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => props.theme.textColor};
  text-transform: uppercase;
  font-size: 1rem;
  background-color: ${(props) => props.theme.normalBtn.bg};
  padding: 3px 10px;
  border-radius: 500px;
  font-size: 0.8rem;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
  & span {
    color: ${(props) => props.theme.textMutedColor};
  }
  & svg {
    font-size: 1rem;
  }
`;

export const Reply__FormContainer = styled.div`
  margin-top: 10px;
`;
