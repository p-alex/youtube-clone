import styled from 'styled-components';

export const ChannelCard__Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--space-large);
  img {
    border-radius: 50%;
  }
  @media (max-width: 450px) {
    flex-direction: column;
    text-align: center;
    gap: var(--space-big);
  }
`;

export const ChannelCard__Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ChannelCard__Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  @media (max-width: 450px) {
    align-items: center;
  }
`;

export const ChannelCard__Username = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

export const ChannelCard__Description = styled.p`
  color: ${(props) => props.theme.textMutedColor};
  font-size: 0.85rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
