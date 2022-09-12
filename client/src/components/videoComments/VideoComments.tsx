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

export interface IComment {
  comment_id: string;
  text: string;
  total_likes: number;
  total_dislikes: number;
  is_liked: boolean | null;
  user_id: string;
  username: string;
  profile_picture: string;
  created_at: string;
}

const VideoComments = ({ video }: { video: VideoInfo }) => {
  const profile_picture = useSelector(
    (state: RootState) => state.auth.user?.profile_picture
  );
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const dispatch = useDispatch();

  const effectRan = useRef(false);

  const { query } = useRouter();

  const [comments, setComments] = useState<IComment[]>([]);
  const [commentToEdit, setCommentToEdit] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const { isAuth } = useAuth();

  const [getComments, { isLoading }] = useAxiosWithRetry<{
    comments: IComment[];
  }>(`api/comments/${query.video_id}/${page}`, {
    accessToken: accessToken!,
  });

  const handleGetComments = async () => {
    try {
      const response = await getComments();
      if (response.result) {
        setComments(response.result.comments);
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

  return (
    <Container>
      <Header>
        <CommentsCountParagraph>
          {video.total_comments} comments
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
              profile_picture
                ? profile_picture
                : "/images/default-profile-picture.jpg"
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
            <Button variant="primary">Comment</Button>
          </AddCommentForm>
        </FormContainer>
      )}

      <CommentsList>
        {comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              comment={comment}
              setCommentToEdit={setCommentToEdit}
            />
          );
        })}
      </CommentsList>
    </Container>
  );
};

export default VideoComments;
