import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../../../layout/style';

export const SuggestionsSideBar__Container = styled.aside<{ isTheatreMode: boolean }>`
  width: 550px;
  grid-area: suggestions;
  margin-top: ${(props) => (props.isTheatreMode ? '20px' : '0')};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
    margin: auto;
    padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;
