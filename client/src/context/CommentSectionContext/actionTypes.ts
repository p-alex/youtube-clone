import { LikeStatusType } from '../../app/features/videoSlice';
import { IComment } from './CommentSectionProvider';

type SetComments = {
  type: 'SET_COMMENTS';
  payload: { comments: IComment[] };
};

type AddToTotalReplies = {
  type: 'ADD_TO_TOTAL_REPLIES';
  payload: { commentId: string };
};

type SubtractFromTotalReplies = {
  type: 'SUBTRACT_FROM_TOTAL_REPLIES';
  payload: { commentId: string };
};

type NextPage = {
  type: 'NEXT_PAGE';
};

type LoadMoreComments = {
  type: 'LOAD_MORE_COMMENTS';
  payload: { comments: IComment[] };
};

type AddComment = {
  type: 'ADD_COMMENT';
  payload: { comment: IComment };
};

type LikeComment = {
  type: 'LIKE_COMMENT';
  payload: {
    commentId: string;
    updatedCommentInfo: {
      comment_id: string;
      like_status: LikeStatusType;
      total_likes: number;
      total_dislikes: number;
    };
  };
};

type DislikeComment = {
  type: 'DISLIKE_COMMENT';
  payload: {
    commentId: string;
    updatedCommentInfo: {
      comment_id: string;
      like_status: LikeStatusType;
      total_likes: number;
      total_dislikes: number;
    };
  };
};

type EditComment = {
  type: 'EDIT_COMMENT';
  payload: { text: string };
};

type DeleteComment = {
  type: 'DELETE_COMMENT';
};

type ToggleToReplyTo = {
  type: 'SET_TO_REPLY_TO';
  payload: { comment_id: string };
};

type ToggleToEdit = {
  type: 'SET_TO_EDIT';
  payload: { comment_id: string };
};

type ToggleToDelete = {
  type: 'SET_TO_DELETE';
  payload: { comment_id: string };
};

type ResetIds = {
  type: 'RESET_IDS';
};

export type CommentSectionActions =
  | SetComments
  | AddToTotalReplies
  | SubtractFromTotalReplies
  | NextPage
  | LoadMoreComments
  | AddComment
  | LikeComment
  | DislikeComment
  | EditComment
  | DeleteComment
  | ToggleToReplyTo
  | ToggleToEdit
  | ToggleToDelete
  | ResetIds;
