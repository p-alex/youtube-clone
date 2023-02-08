import { LikeStatusType } from '../../app/features/videoSlice';
import { IReply } from './ReplySectionProvider';

type SetReplies = {
  type: 'SET_REPLIES';
  payload: { replies: IReply[] };
};

type NextPage = {
  type: 'NEXT_PAGE';
};

type LoadMoreComments = {
  type: 'LOAD_MORE_COMMENTS';
  payload: { replies: IReply[] };
};

type AddReply = {
  type: 'ADD_REPLY';
  payload: { reply: IReply };
};

type LikeReply = {
  type: 'LIKE_REPLY';
  payload: {
    updatedReplyInfo: {
      reply_id: string;
      like_status: LikeStatusType;
      total_likes: number;
      total_dislikes: number;
    };
  };
};

type DislikeReply = {
  type: 'DISLIKE_REPLY';
  payload: {
    updatedReplyInfo: {
      reply_id: string;
      like_status: LikeStatusType;
      total_likes: number;
      total_dislikes: number;
    };
  };
};

type EditReply = {
  type: 'EDIT_REPLY';
  payload: { text: string };
};

type DeleteReply = {
  type: 'DELETE_REPLY';
};

type ToggleToReplyTo = {
  type: 'SET_TO_REPLY_TO';
  payload: { reply_id: string; reply_username: string };
};

type ToggleToEdit = {
  type: 'SET_TO_EDIT';
  payload: { reply_id: string };
};

type ToggleToDelete = {
  type: 'SET_TO_DELETE';
  payload: { reply_id: string };
};

type ResetIds = {
  type: 'RESET_IDS';
};

export type ReplySectionActions =
  | SetReplies
  | NextPage
  | LoadMoreComments
  | AddReply
  | LikeReply
  | DislikeReply
  | EditReply
  | DeleteReply
  | ToggleToReplyTo
  | ToggleToEdit
  | ToggleToDelete
  | ResetIds;
