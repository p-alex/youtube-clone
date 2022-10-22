import { ReplySectionActions } from './actionTypes';
import { likeOrDislikeReply } from './likeOrDislikeReply';
import { InitialState } from './ReplySectionProvider';

export const reducer = (state: InitialState, action: ReplySectionActions) => {
  switch (action.type) {
    case 'SET_REPLIES':
      return { ...state, replies: action.payload.replies };
    case 'NEXT_PAGE':
      return { ...state, page: state.page + 1 };
    case 'LOAD_MORE_COMMENTS':
      return {
        ...state,
        replies: [...state.replies, ...action.payload.replies],
      };
    case 'ADD_REPLY':
      return {
        ...state,
        replies:
          state.replies.length > 0
            ? [...state.replies, action.payload.reply]
            : state.replies,
        newReplies: [...state.newReplies, action.payload.reply],
      };
    case 'LIKE_REPLY':
      return {
        ...state,
        replies: likeOrDislikeReply(state.replies, action.payload.updatedReplyInfo),
        newReplies: likeOrDislikeReply(state.newReplies, action.payload.updatedReplyInfo),
      };
    case 'DISLIKE_REPLY':
      return {
        ...state,
        replies: likeOrDislikeReply(state.replies, action.payload.updatedReplyInfo),
        newReplies: likeOrDislikeReply(state.newReplies, action.payload.updatedReplyInfo),
      };
    case 'EDIT_REPLY':
      return {
        ...state,
        replies: state.replies.map((reply) => {
          if (reply.reply_id === state.toEdit) {
            reply.text = action.payload.text;
            return reply;
          }
          return reply;
        }),
        newReplies: state.newReplies.map((reply) => {
          if (reply.reply_id === state.toEdit) {
            reply.text = action.payload.text;
            return reply;
          }
          return reply;
        }),
      };
    case 'DELETE_REPLY':
      return {
        ...state,
        replies: state.replies.filter((reply) => reply.reply_id !== state.toDelete),
        newReplies: state.newReplies.filter((reply) => reply.reply_id !== state.toDelete),
      };
    case 'SET_TO_REPLY_TO':
      return {
        ...state,
        toReplyTo:
          state.toReplyTo === action.payload.reply_id ? '' : action.payload.reply_id,
      };
    case 'SET_TO_EDIT':
      return {
        ...state,
        toEdit: state.toEdit === action.payload.reply_id ? '' : action.payload.reply_id,
      };
    case 'SET_TO_DELETE':
      return {
        ...state,
        toDelete:
          state.toDelete === action.payload.reply_id ? '' : action.payload.reply_id,
      };
    case 'RESET_IDS':
      return { ...state, toReplyTo: '', toEdit: '', toDelete: '' };
    default:
      return state;
  }
};
