import styled from 'styled-components';

export const ManageVideoCard__Container = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.uiBg};
  padding: 10px;
`;

export const ManageVideoCard__Image = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

export const ManageVideoCard__Duration = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
`;

export const ManageVideoCard__Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ManageVideoCard__Title = styled.h3`
  color: ${(props) => props.theme.textColor};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const ManageVideoCard__Items = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ManageVideoCard__Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  padding: 5px;
  color: ${(props) => props.theme.textColor};
  font-size: 0.85rem;
  svg {
    font-size: 1rem;
  }
`;
