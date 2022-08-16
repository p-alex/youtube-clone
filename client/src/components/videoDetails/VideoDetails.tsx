import Image from 'next/image';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import {
  Description,
  Details,
  DetailsContainer,
  DetailsHeader,
  ProfilePicture,
  SubCount,
  SubscribeBtn,
  Username,
  UsernameAndSubsContainer,
} from './style';

const VideoDetails = () => {
  const { isAuth } = useAuth();
  return (
    <DetailsContainer>
      <ProfilePicture
        as={Image}
        src={'/images/profile-picture.jpg'}
        width={48}
        height={48}
        alt=""
      />
      <Details>
        <DetailsHeader>
          <UsernameAndSubsContainer>
            <Username>Jordbær</Username>
            <SubCount>1k subscribers</SubCount>
          </UsernameAndSubsContainer>
          {isAuth && <SubscribeBtn>Subscribe</SubscribeBtn>}
        </DetailsHeader>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsum rem cumque
          quia nisi fugit dicta! Excepturi impedit accusamus dolores omnis quasi autem
          esse asperiores repellat assumenda aliquam culpa, quia quod reiciendis
          aspernatur necessitatibus ut in aut unde sit dolorum cumque alias adipisci. Enim
          expedita unde iusto excepturi voluptate ea!
        </Description>
      </Details>
    </DetailsContainer>
  );
};

export default VideoDetails;
