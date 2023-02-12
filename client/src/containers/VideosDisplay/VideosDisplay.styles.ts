import styled from 'styled-components';

export const VideosDisplay__Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1850px;
`;

export const VideosDisplay__VideoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  list-style: none;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const VideosDisplay__VideoItem = styled.li``;
