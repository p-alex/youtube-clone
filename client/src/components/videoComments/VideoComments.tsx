import React, { useState, useEffect, useRef } from "react";
import { MdSort } from "react-icons/md";
import Image from "next/image";
import Comment from "../comment/Comment";
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
} from "./style";
import useAuth from "../../hooks/useAuth";
import {
  disableKeyBinds,
  enableKeyBinds,
  VideoInfo,
} from "../../app/features/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useAxiosWithRetry from "../../hooks/useAxiosWithRetry";
import { useRouter } from "next/router";
import { Button } from "../../ui/Button";
import {
  addComment,
  IComment,
  setComments,
  setNewCommentText,
} from "../../app/features/commentsSectionSlice";

const VideoComments = ({
  video,
  totalComments,
}: {
  video: VideoInfo;
  totalComments: number;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const newCommentText = useSelector(
    (state: RootState) => state.commentsSection.newCommentText
  );

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const dispatch = useDispatch();

  const effectRan = useRef(false);

  const { query } = useRouter();

  const { isAuth } = useAuth();

  const {
    comments,
    page,
    totalComments: tComments,
  } = useSelector((state: RootState) => state.commentsSection);

  const [getComments, { isLoading: isGetCommentsLoading }] = useAxiosWithRetry<{
    comments: IComment[];
  }>(`api/comments/${query.video_id}/${page}`, {
    accessToken: accessToken!,
  });

  const [addCommentRequest, { isLoading: isAddCommentLoading }] =
    useAxiosWithRetry<{
      comment_id: string;
    }>("api/comments", {
      method: "POST",
      accessToken,
      body: { videoId: video.video_id, text: newCommentText },
    });

  const handleGetComments = async () => {
    try {
      const response = await getComments();
      if (response.result) {
        dispatch(
          setComments({ comments: response.result.comments, totalComments })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (effectRan.current) return;
    handleGetComments();
    return () => {
      effectRan.current = true;
    };
  }, [query.video_id]);

  const handleAddComment = async () => {
    if (!newCommentText) return;
    try {
      const response = await addCommentRequest();
      if (response.success && response.result) {
        const newComment: IComment = {
          comment_id: response.result.comment_id,
          text: newCommentText,
          total_likes: 0,
          total_dislikes: 0,
          is_liked: null,
          user_id: user!.user_id,
          username: user!.username,
          profile_picture: user!.profile_picture,
          created_at: new Date(),
        };
        dispatch(addComment({ comment: newComment }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header>
        <CommentsCountParagraph>
          {tComments} {tComments === 1 ? "comment" : "comments"}
        </CommentsCountParagraph>
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
              user?.profile_picture
                ? user?.profile_picture
                : "/images/default-profile-picture.jpg"
            }
            width={48}
            height={48}
            alt=""
          />
          <AddCommentForm>
            <TextArea
              value={newCommentText}
              onChange={(e) =>
                dispatch(setNewCommentText({ text: e.target.value }))
              }
              placeholder="Add a comment..."
              onFocus={() => dispatch(disableKeyBinds())}
              onBlur={() => dispatch(enableKeyBinds())}
            />
            <Button variant="primary" onClick={handleAddComment}>
              Comment
            </Button>
          </AddCommentForm>
        </FormContainer>
      )}

      <CommentsList>
        {comments.map((comment, index) => {
          return <Comment key={index} comment={comment} />;
        })}
      </CommentsList>
    </Container>
  );
};

export default VideoComments;
