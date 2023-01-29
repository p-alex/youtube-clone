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
import router from 'next/router';

const useReply = (reply: IReply, comment: IComment) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const { dispatchCommentSection } = useContext(CommentSectionContext);

  const [newReplyText, setNewReplyText] = useState('');
  const [editedReplyText, setEditedReplyText] = useState(reply.text);

  const { dispatchReplySection } = useContext(ReplySectionContext);

  const changeNewReplyText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReplyText(event.target.value);
  };

  const changeEditedReplyText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedReplyText(event.target.value);
  };

  const handleSetToReplyTo = () => {
    if (!user.user_id) return router.push('/signin');
    dispatchReplySection({
      type: 'SET_TO_REPLY_TO',
      payload: { reply_id: reply.reply_id },
    });
  };

  const handleSetToEdit = () => {
    dispatchReplySection({
      type: 'SET_TO_EDIT',
      payload: { reply_id: reply.reply_id },
    });
  };

  const handleSetToDelete = () => {
    dispatchReplySection({
      type: 'SET_TO_DELETE',
      payload: { reply_id: reply.reply_id },
    });
  };

  const handleResetIds = () => {
    dispatchReplySection({
      type: 'RESET_IDS',
    });
  };

  const [addReply, { isLoading: isAddReplyLoading, errors: addReplyErrors }] =
    useAxiosWithRetry<{ commentId: string; text: string }, { reply: IReply }>(
      'api/replies',
      'POST'
    );

  const [likeReply, { isLoading: isLikeReplyLoading }] = useAxiosWithRetry<
    undefined,
    {
      updatedReplyInfo: {
        reply_id: string;
        like_status: LikeStatusType;
        total_likes: number;
        total_dislikes: number;
      };
    }
  >(`api/replies/react/like/${reply.reply_id}`, 'POST');

  const [dislikeReply, { isLoading: isDislikeReplyLoading }] = useAxiosWithRetry<
    undefined,
    {
      updatedReplyInfo: {
        reply_id: string;
        like_status: LikeStatusType;
        total_likes: number;
        total_dislikes: number;
      };
    }
  >(`api/replies/react/dislike/${reply.reply_id}`, 'POST');

  const [editReply, { isLoading: isEditReplyLoading, errors: editReplyErrors }] =
    useAxiosWithRetry<
      { replyId: string; text: string },
      { reply_id: string; text: string }
    >('api/replies', 'PATCH');

  const [deleteReply, { isLoading: isDeleteReplyLoading }] = useAxiosWithRetry<
    { replyId: string; commentId: string },
    { reply_id: string }
  >('api/replies', 'DELETE');

  const handleAddReply = async () => {
    const { success, result } = await addReply({
      commentId: reply.comment_id,
      text: removeEmptyLinesFromString(newReplyText),
    });
    if (!success || !result) return;
    const newReply = {
      ...result.reply,
      user_id: user.user_id,
      username: user.username,
      profile_picture: user.profile_picture,
      replied_to: comment.username,
    };
    dispatchReplySection({ type: 'ADD_REPLY', payload: { reply: newReply } });
    dispatchReplySection({ type: 'RESET_IDS' });
    dispatchCommentSection({
      type: 'ADD_TO_TOTAL_REPLIES',
      payload: { commentId: reply.comment_id },
    });
    setNewReplyText('');
    dispatch(addToTotalComments());
  };

  const handleLikeReply = async () => {
    if (!user.user_id) return router.push('/signin');
    const { success, result } = await likeReply(undefined);
    if (!success || !result) return;
    dispatchReplySection({
      type: 'LIKE_REPLY',
      payload: { updatedReplyInfo: result.updatedReplyInfo },
    });
  };

  const handleDislikeReply = async () => {
    if (!user.user_id) return router.push('/signin');
    const { success, result } = await dislikeReply(undefined);
    if (!success || !result) return;
    dispatchReplySection({
      type: 'DISLIKE_REPLY',
      payload: { updatedReplyInfo: result.updatedReplyInfo },
    });
  };

  const handleEditReply = async () => {
    const { success, result } = await editReply({
      replyId: reply.reply_id,
      text: removeEmptyLinesFromString(editedReplyText),
    });
    if (!success || !result) return;
    dispatchReplySection({
      type: 'EDIT_REPLY',
      payload: { text: editedReplyText },
    });
    dispatchReplySection({ type: 'RESET_IDS' });
  };

  const handleDeleteReply = async () => {
    const { success, result } = await deleteReply({
      commentId: reply.comment_id,
      replyId: reply.reply_id,
    });
    if (!success || !result) return;
    dispatchReplySection({ type: 'DELETE_REPLY' });
    dispatchReplySection({ type: 'RESET_IDS' });
    dispatchCommentSection({
      type: 'SUBTRACT_FROM_TOTAL_REPLIES',
      payload: { commentId: reply.comment_id },
    });
    dispatch(subtractFromTotalComments());
  };

  return {
    newReplyText,
    changeNewReplyText,
    editedReplyText,
    changeEditedReplyText,
    handleSetToReplyTo,
    handleSetToEdit,
    handleSetToDelete,
    handleResetIds,
    handleAddReply,
    handleLikeReply,
    handleDislikeReply,
    handleEditReply,
    handleDeleteReply,
    isAddReplyLoading,
    isLikeReplyLoading,
    isDislikeReplyLoading,
    isEditReplyLoading,
    isDeleteReplyLoading,
    addReplyErrors,
    editReplyErrors,
  };
};

export default useReply;
