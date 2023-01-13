import styled from 'styled-components';

export const EditVideoModal__ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EditVideoModal__HiddenInput = styled.input`
  display: none;
`;

export const EditVideoModal__TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const EditVideoModal__Tag = styled.p`
  background-color: ${(props) => props.theme.normalBtn.bg};
  color: ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-radius: 500px;
`;

export const EditVideoModal__SubmitContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const EditVideoModal__ResultMessage = styled.p<{ isSuccess: boolean }>`
  font-weight: 700;
  color: ${(props) => (props.isSuccess ? '#95C623' : 'red')};
  font-size: 0.85rem;
`;
