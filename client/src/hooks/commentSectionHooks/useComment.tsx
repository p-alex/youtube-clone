import Router from 'next/router';
import { ChangeEvent, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToTotalComments,
  LikeStatusType,
  subtractFromTotalComments,
} from '../../app/features/videoSlice';
import { RootState } from '../../app/store';
import {
  CommentSectionContext,
  IComment,
} from '../../context/CommentSectionContext/CommentSectionProvider';
import {
  IReply,
  ReplySectionContext,
} from '../../context/ReplySectionContext/ReplySectionProvider';
import { removeEmptyLinesFromString } from '../../utils/removeEmptyLinesFromString';
import useAxiosWithRetry from '../requestHooks/useAxiosWithRetry';

const useComment = (comment: IComment) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { dispatchReplySection } = useContext(ReplySectionContext);
  const [newReplyText, setNewReplyText] = useState('');
  const [editedCommentText, setEditedCommentText] = useState(comment.text);

  const { dispatchCommentSection } = useContext(CommentSectionContext);

  const changeNewReplyText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReplyText(event.target.value);
  };

  const changeEditedCommentText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedCommentText(event.target.value);
  };

  const [showReplies, setShowReplies] = useState(false);

  const handleToggleReplies = () => {
    setShowReplies((prevState) => !prevState);
  };

  const handleSetToReplyTo = () => {
    if (!user?.user_id) return Router.push('/signin');
    setNewReplyText('');
    dispatchCommentSection({
      type: 'SET_TO_REPLY_TO',
      payload: { comment_id: comment.comment_id },
    });
  };

  const handleSetToEdit = () => {
    dispatchCommentSection({
      type: 'SET_TO_EDIT',
      payload: { comment_id: comment.comment_id },
    });
  };

  const handleSetToDelete = () => {
    dispatchCommentSection({
      type: 'SET_TO_DELETE',
      payload: { comment_id: comment.comment_id },
    });
  };

  const handleResetIds = () => {
    dispatchCommentSection({
      type: 'RESET_IDS',
    });
  };

  const [addReply, { isLoading: isAddReplyLoading }] = useAxiosWithRetry<
    { commentId: string; text: string },
    { reply: IReply }
  >('api/replies', 'POST');

  const [likeComment, { isLoading: isLikeCommentLoading }] = useAxiosWithRetry<
    undefined,
    {
      updatedCommentInfo: {
        comment_id: string;
        like_status: LikeStatusType;
        total_likes: number;
        total_dislikes: number;
      };
    }
  >(`api/comments/react/like/${comment.comment_id}`, 'POST');

  const [dislikeComment, { isLoading: isDislikeCommentLoading }] = useAxiosWithRetry<
    undefined,
    {
      updatedCommentInfo: {
        comment_id: string;
        like_status: LikeStatusType;
        total_likes: number;
        total_dislikes: number;
      };
    }
  >(`api/comments/react/dislike/${comment.comment_id}`, 'POST');

  const [editComment, { isLoading: isEditLoading }] = useAxiosWithRetry<
    { commentId: string; text: string },
    { comment_id: string }
  >('api/comments', 'PATCH');

  const [deleteComment, { isLoading: isDeleteLoading }] = useAxiosWithRetry<
    { commentId: string; videoId: string },
    { comment_id: string }
  >('api/comments', 'DELETE');

  const handleLikeComment = async () => {
    if (!user?.user_id) return Router.push('/signin');
    const { success, result } = await likeComment(undefined);
    if (!success || !result) return;
    dispatchCommentSection({
      type: 'LIKE_COMMENT',
      payload: {
        commentId: comment.comment_id,
        updatedCommentInfo: result.updatedCommentInfo,
      },
    });
  };

  const handleDislikeComment = async () => {
    if (!user?.user_id) return Router.push('/signin');
    const { success, result } = await dislikeComment(undefined);
    if (!success || !result) return;
    dispatchCommentSection({
      type: 'DISLIKE_COMMENT',
      payload: {
        commentId: comment.comment_id,
        updatedCommentInfo: result.updatedCommentInfo,
      },
    });
  };

  const handleEditComment = async () => {
    const { success, result } = await editComment({
      commentId: comment.comment_id,
      text: removeEmptyLinesFromString(editedCommentText),
    });
    if (!success || !result) return;
    dispatchCommentSection({
      type: 'EDIT_COMMENT',
      payload: { text: editedCommentText },
    });
    dispatchCommentSection({ type: 'RESET_IDS' });
  };

  const handleDeleteComment = async () => {
    const { success, result } = await deleteComment({
      commentId: comment.comment_id,
      videoId: comment.video_id,
    });
    if (!success || !result) return;
    dispatchCommentSection({
      type: 'DELETE_COMMENT',
    });
    dispatch(subtractFromTotalComments());
  };

  const handleAddReply = async () => {
    const { success, result } = await addReply({
      commentId: comment.comment_id,
      text: removeEmptyLinesFromString(newReplyText),
    });
    if (!success || !result) return;
    const newReply = {
      ...result.reply,
      user_id: user.user_id,
      username: user.username,
      profile_picture: user.profile_picture,
    };
    dispatchReplySection({ type: 'ADD_REPLY', payload: { reply: newReply } });
    setNewReplyText('');
    dispatchCommentSection({
      type: 'ADD_TO_TOTAL_REPLIES',
      payload: { commentId: comment.comment_id },
    });
    dispatchCommentSection({ type: 'RESET_IDS' });
    dispatch(addToTotalComments());
  };

  return {
    newReplyText,
    changeNewReplyText,
    editedCommentText,
    changeEditedCommentText,
    showReplies,
    handleAddReply,
    handleToggleReplies,
    handleSetToReplyTo,
    handleSetToEdit,
    handleSetToDelete,
    handleResetIds,
    handleLikeComment,
    handleDislikeComment,
    handleEditComment,
    handleDeleteComment,
    isLikeCommentLoading,
    isDislikeCommentLoading,
    isEditLoading,
    isDeleteLoading,
  };
};

export default useComment;
