import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {
  Body,
  Button,
  ButtonsContainer,
  Container,
  CreatedAt,
  Header,
  ProfilePicture,
  Text,
  Username,
} from './style';

const Comment = () => {
  return (
    <Container>
      <Link href={'#'}>
        <a>
          <ProfilePicture>
            <Image src={'/images/profile-picture.jpg'} width={40} height={40} alt="" />
          </ProfilePicture>
        </a>
      </Link>
      <Body>
        <Header>
          <Link href={'#'}>
            <a>
              <Username>Jordbær</Username>
            </a>
          </Link>
          <CreatedAt>1 hour ago</CreatedAt>
        </Header>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eius quae
          aspernatur, in esse blanditiis similique laudantium temporibus cum quasi, aut
          necessitatibus sapiente doloremque id, facere reprehenderit impedit quidem
          fugit?
        </Text>
        <ButtonsContainer>
          <Button>
            <ThumbUpOffAltIcon /> <span>200</span>
          </Button>
          <Button>
            <ThumbDownOffAltIcon /> <span>22134</span>
          </Button>
          <Button>Reply</Button>
        </ButtonsContainer>
      </Body>
    </Container>
  );
};

export default Comment;
