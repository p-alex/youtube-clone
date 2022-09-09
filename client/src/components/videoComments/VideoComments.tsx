import React from 'react';
import { MdSort } from 'react-icons/md';
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
import { disableKeyBinds, enableKeyBinds } from '../../app/features/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const VideoComments = () => {
  const profile_picture = useSelector(
    (state: RootState) => state.auth.user?.profile_picture
  );
  const dispatch = useDispatch();
  const array: any[] = [];
  const { isAuth } = useAuth();
  return (
    <Container>
      <Header>
        <CommentsCountParagraph>149 comments</CommentsCountParagraph>
        <SortBtn isActive={true}>
          <MdSort />
          Top comments
        </SortBtn>
        <SortBtn isActive={false}>
          <MdSort />
          Newest first
        </SortBtn>
      </Header>

      {isAuth && (
        <FormContainer>
          <ProfilePicture
            as={Image}
            src={
              profile_picture ? profile_picture : '/images/default-profile-picture.jpg'
            }
            width={48}
            height={48}
            alt=""
          />
          <AddCommentForm>
            <TextArea
              placeholder="Add a comment..."
              onFocus={() => dispatch(disableKeyBinds())}
              onBlur={() => dispatch(enableKeyBinds())}
            />
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
