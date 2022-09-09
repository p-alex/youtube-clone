import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
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
  const profile_picture = useSelector(
    (state: RootState) => state.auth.user?.profile_picture
  );
  return (
    <Container>
      <Link href={'#'}>
        <a>
          <ProfilePicture>
            <Image
              src={
                profile_picture ? profile_picture : '/images/default-profile-picture.jpg'
              }
              width={40}
              height={40}
              alt=""
            />
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
            <AiOutlineLike /> <span>200</span>
          </Button>
          <Button>
            <AiOutlineDislike /> <span>22134</span>
          </Button>
          <Button>Reply</Button>
        </ButtonsContainer>
      </Body>
    </Container>
  );
};

export default Comment;
