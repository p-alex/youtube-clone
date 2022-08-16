import React from 'react';
import SortIcon from '@mui/icons-material/Sort';
import Image from 'next/image';
import Comment from '../comment/Comment';
import {
  AddCommentForm,
  CommentBtn,
  CommentsCountParagraph,
  CommentsList,
  Container,
  FormContainer,
  Header,
  ProfilePicture,
  SortBtn,
  TextArea,
} from './style';
import useAuth from '../../hooks/useAuth';

const VideoComments = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { isAuth } = useAuth();
  return (
    <Container>
      <Header>
        <CommentsCountParagraph>149 comments</CommentsCountParagraph>
        <SortBtn isActive={true}>
          <SortIcon />
          Top comments
        </SortBtn>
        <SortBtn isActive={false}>
          <SortIcon />
          Newest first
        </SortBtn>
      </Header>

      {isAuth && (
        <FormContainer>
          <ProfilePicture
            as={Image}
            src={'/images/profile-picture.jpg'}
            width={48}
            height={48}
            alt=""
          />
          <AddCommentForm>
            <TextArea placeholder="Add a comment..." />
            <CommentBtn>Comment</CommentBtn>
          </AddCommentForm>
        </FormContainer>
      )}

      <CommentsList>
        {array.map((comment, index) => {
          return <Comment key={index} />;
        })}
      </CommentsList>
    </Container>
  );
};

export default VideoComments;
