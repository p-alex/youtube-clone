import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  editComment,
  IComment,
  resetCommentIds,
  setCommentToDelete,
  setCommentToEdit,
} from "../../app/features/commentsSectionSlice";
import { disableKeyBinds, enableKeyBinds } from "../../app/features/videoSlice";
import { RootState } from "../../app/store";
import useAxiosWithRetry from "../../hooks/useAxiosWithRetry";
import { Button } from "../../ui/Button";
import { Textarea } from "../../ui/Textarea";
import { dateConverter } from "../../utils/dateConverter";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import FocusTrapRedirectFocus from "../focusTrap";
import {
  Body,
  CommentButton,
  ButtonsContainer,
  CommentBody,
  Container,
  CreatedAt,
  FormBody,
  FormButtons,
  Header,
  ProfilePicture,
  Text,
  Username,
} from "./style";

const Comment = ({ comment }: { comment: IComment }) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  const { commentToEdit, commentToDelete } = useSelector(
    (state: RootState) => state.commentsSection
  );

  const dispatch = useDispatch();

  const { query } = useRouter();

  const editBtnRef = useRef<HTMLButtonElement>(null);
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const [deleteCommentRequest, { isLoading: isDeleteLoading }] =
    useAxiosWithRetry<{
      comment_id: string;
    }>("api/comments", {
      body: {
        commentId: comment.comment_id,
        videoId: query.video_id,
      },
      method: "DELETE",
      accessToken,
    });

  const handleSetCommentToDelete = () => {
    dispatch(setCommentToDelete({ comment_id: comment.comment_id }));
  };

  const handleToggleDeleteModeOff = () => {
    dispatch(resetCommentIds());
    deleteBtnRef.current?.focus();
  };

  const handleDeleteComment = async () => {
    try {
      const response = await deleteCommentRequest();
      if (response.success && response.result) {
        dispatch(deleteComment({ comment_id: response.result.comment_id }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [editedCommentText, setEditedCommentText] = useState(comment.text);

  const [editCommentRequest, { isLoading: isEditCommentLoading }] =
    useAxiosWithRetry<{ comment_id: string }>("api/comments", {
      method: "PATCH",
      accessToken,
      body: {
        commentId: comment.comment_id,
        videoId: query.video_id,
        text: editedCommentText,
      },
    });

  const handleSetCommentToEdit = () => {
    dispatch(setCommentToEdit({ commentId: comment.comment_id }));
  };

  const handleToggleEditModeOff = () => {
    dispatch(resetCommentIds());
    editBtnRef.current?.focus();
  };

  const handleEditComment = async () => {
    if (comment.text === editedCommentText) return;
    try {
      const response = await editCommentRequest();
      if (response.success && response.result) {
        dispatch(
          editComment({
            commentId: response.result.comment_id,
            newText: editedCommentText,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const firstFocusableElement = useRef<HTMLTextAreaElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  return (
    <Container>
      {commentToDelete === comment.comment_id && (
        <ConfirmationModal
          toggleModal={handleToggleDeleteModeOff}
          btnName={"Delete"}
          func={handleDeleteComment}
        />
      )}
      <Link href={"#"}>
        <a>
          <ProfilePicture>
            <Image
              src={comment.profile_picture}
              width={40}
              height={40}
              alt=""
            />
          </ProfilePicture>
        </a>
      </Link>
      <Body>
        {commentToEdit !== comment.comment_id && (
          <CommentBody>
            <Header>
              <Link href={"#"}>
                <a>
                  <Username>{comment.username}</Username>
                </a>
              </Link>
              <CreatedAt>
                {dateConverter(new Date(comment.created_at).getTime())}
              </CreatedAt>
            </Header>
            <Text>{comment.text}</Text>
            <ButtonsContainer>
              <CommentButton>
                {comment.is_liked ? <AiFillLike /> : <AiOutlineLike />}
                <span>{comment.total_likes}</span>
              </CommentButton>
              <CommentButton>
                {comment.is_liked === false ? (
                  <AiFillDislike />
                ) : (
                  <AiOutlineDislike />
                )}
                <span>{comment.total_dislikes}</span>
              </CommentButton>
              <CommentButton>Reply</CommentButton>
              {comment.user_id === user!.user_id && (
                <>
                  <CommentButton
                    onClick={handleSetCommentToEdit}
                    ref={editBtnRef}
                  >
                    Edit
                  </CommentButton>
                  <CommentButton
                    onClick={handleSetCommentToDelete}
                    ref={deleteBtnRef}
                  >
                    Delete
                  </CommentButton>
                </>
              )}
            </ButtonsContainer>
          </CommentBody>
        )}
        {commentToEdit === comment.comment_id && (
          <FormBody>
            <FocusTrapRedirectFocus element={lastFocusableElement} />
            <Textarea
              value={editedCommentText}
              ref={firstFocusableElement}
              onChange={(e) => setEditedCommentText(e.target.value)}
              placeholder="Edit your comment"
              autoFocus={true}
              onFocus={() => dispatch(disableKeyBinds())}
              onBlur={() => dispatch(enableKeyBinds())}
            />
            <FormButtons>
              <Button variant="primary" onClick={handleEditComment}>
                Edit
              </Button>
              <Button
                variant="normal"
                onClick={handleToggleEditModeOff}
                ref={lastFocusableElement}
              >
                Cancel
              </Button>
            </FormButtons>
            <FocusTrapRedirectFocus element={firstFocusableElement} />
          </FormBody>
        )}
      </Body>
    </Container>
  );
};

export default Comment;
