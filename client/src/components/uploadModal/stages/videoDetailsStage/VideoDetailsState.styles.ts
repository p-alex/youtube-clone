import styled from 'styled-components';

export const VideoDetailsState__Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  height: max-content;
`;

export const VideoDetailsState__ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const VideoDetailsState__HiddenInput = styled.input`
  display: none;
`;

export const VideoDetailsState__FormContainer = styled.form`
  position: relative;
  width: 100%;
`;

export const VideoDetailsState__InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
`;

export const VideoDetailsState__Error = styled.p`
  color: red;
  margin-top: 5px;
`;

export const VideoDetailsState__TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const VideoDetailsState__Tag = styled.p`
  background-color: ${(props) => props.theme.normalBtn.bg};
  color: ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-radius: 500px;
`;
