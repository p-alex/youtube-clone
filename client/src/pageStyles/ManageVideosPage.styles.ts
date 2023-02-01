import styled from 'styled-components';

export const ManageVideosPage__VideoCards = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 2fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
