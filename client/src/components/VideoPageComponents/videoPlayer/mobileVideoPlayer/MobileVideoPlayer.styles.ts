import styled from 'styled-components';

export const MobileVideoPlayer__Container = styled.div<{ hideOverflow: boolean }>`
  position: relative;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: ${(props) => (props.hideOverflow ? 'hidden' : 'none')};
  display: flex;
  align-items: center;
  margin: auto;
  user-select: none;
`;

export const MobileVideoPlayer__Video = styled.video`
  width: 100%;
`;
