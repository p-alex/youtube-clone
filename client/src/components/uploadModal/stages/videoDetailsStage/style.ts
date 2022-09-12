import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  height: max-content;
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme.inputBg};
  border: dashed 3px ${(props) => props.theme.borderColor};
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FormContainer = styled.form`
  position: relative;
  width: 100%;
`;

export const InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const InputError = styled.p`
  color: red;
  margin-top: 5px;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Tag = styled.p`
  background-color: ${(props) => props.theme.normalBtn.bg};
  color: ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-radius: 500px;
`;
