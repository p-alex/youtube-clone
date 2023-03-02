import styled from 'styled-components';

export const VideosDisplay__Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1850px;
`;

export const VideosDisplay__VideoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  list-style: none;
`;

export const VideosDisplay__VideoItem = styled.li``;
