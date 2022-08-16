import Image from 'next/image';
import React, { useState } from 'react';
import {
  CloseBtn,
  CommentBtn,
  Comments,
  Container,
  Form,
  FormContainer,
  FormInput,
  Handle,
  Header,
  ProfilePicture,
  Title,
  TitleAndClose,
} from './style';
import CloseIcon from '@mui/icons-material/Close';
import Comment from '../comment/Comment';
import useDisableScroll from '../../hooks/useDisableScroll';
import { motion } from 'framer-motion';

const VideoCommentsMobile = ({
  handleToggleMobileComments,
}: {
  handleToggleMobileComments: () => void;
}) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [canMove, setCanMove] = useState(false);
  const [initialPos, setInitialPos] = useState(0);
  const [moved, setMoved] = useState(0);
  useDisableScroll();
  const handleMouseDown = (e: any) => {
    setInitialPos(e.pageY);
    setCanMove(true);
  };
  const handleMouseMove = (e: any) => {
    if (canMove && initialPos - e.pageY < 0) {
      setMoved(-(initialPos - e.pageY));
    }
  };
  const handleTouchStart = (e: any) => {
    setInitialPos(e.touches[0].pageY);
    setCanMove(true);
  };
  const handleTouchMove = (e: any) => {
    if (canMove && initialPos - e.touches[0].pageY < 0) {
      setMoved(-(initialPos - e.touches[0].pageY));
    }
  };
  const handleEnd = () => {
    setCanMove(false);
    if (Math.abs(moved) > 100) {
      handleToggleMobileComments();
      return;
    }
    setInitialPos(0);
    setMoved(0);
  };
  return (
    <Container
      id="mobile-comments-container"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'just' }}
      exit={{ opacity: 0 }}
      style={{ transform: `translateY(${moved}px)` }}
    >
      <Header
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={handleEnd}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={handleEnd}
      >
        <Handle></Handle>
        <TitleAndClose>
          <Title>Comments</Title>
          <CloseBtn onClick={handleToggleMobileComments}>
            <CloseIcon />
          </CloseBtn>
        </TitleAndClose>
      </Header>
      <FormContainer>
        <ProfilePicture
          as={Image}
          src={'/images/profile-picture.jpg'}
          width={48}
          height={48}
        />
        <Form>
          <FormInput placeholder="Add a comment..." />
          <CommentBtn>Comment</CommentBtn>
        </Form>
      </FormContainer>
      <Comments>
        {array.map((comment, index) => {
          return <Comment key={index} />;
        })}
      </Comments>
    </Container>
  );
};

export default VideoCommentsMobile;
