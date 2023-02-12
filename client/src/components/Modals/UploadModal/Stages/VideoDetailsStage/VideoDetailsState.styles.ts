import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../../../../layout/style';

export const VideoDetailsState__ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 24px;
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
  margin-bottom: 8px;
`;

export const VideoDetailsState__Error = styled.p`
  color: red;
  margin-top: 8px;
`;

export const VideoDetailsState__TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const VideoDetailsState__Tag = styled.p`
  background-color: ${(props) => props.theme.normalBtn.bg};
  color: ${(props) => props.theme.textColor};
  padding: 8px 16px;
  border-radius: ${BORDER_RADIUS_ROUND}px;
`;
