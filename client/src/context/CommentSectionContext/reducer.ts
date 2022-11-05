import { CommentSectionActions } from './actionTypes';
import { InitialState } from './CommentSectionProvider';

export const reducer = (state: InitialState, action: CommentSectionActions) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { ...state, comments: [...action.payload.comments] };
    case 'ADD_TO_TOTAL_REPLIES':
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.comment_id === action.payload.commentId) {
            comment.total_replies += 1;
            return comment;
          }
          return comment;
        }),
      };
    case 'SUBTRACT_FROM_TOTAL_REPLIES':
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.comment_id === action.payload.commentId) {
            comment.total_replies -= 1;
            return comment;
          }
          return comment;
        }),
      };
    case 'NEXT_PAGE':
      return { ...state, page: state.page + 1 };
    case 'LOAD_MORE_COMMENTS':
      return {
        ...state,
        comments: [...state.comments, ...action.payload.comments],
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments],
      };
    case 'LIKE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.comment_id === action.payload.commentId) {
            comment.like_status = action.payload.updatedCommentInfo.like_status;
            comment.total_likes = action.payload.updatedCommentInfo.total_likes;
            comment.total_dislikes = action.payload.updatedCommentInfo.total_dislikes;
            return comment;
          }
          return comment;
        }),
      };
    case 'DISLIKE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.comment_id === action.payload.commentId) {
            comment.like_status = action.payload.updatedCommentInfo.like_status;
            comment.total_likes = action.payload.updatedCommentInfo.total_likes;
            comment.total_dislikes = action.payload.updatedCommentInfo.total_dislikes;
            return comment;
          }
          return comment;
        }),
      };
    case 'EDIT_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.comment_id === state.toEdit) {
            comment.text = action.payload.text;
            return comment;
          }
          return comment;
        }),
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.comment_id !== state.toDelete
        ),
      };
    case 'SET_TO_REPLY_TO':
      return {
        ...state,
        toEdit: '',
        toDelete: '',
        toReplyTo: action.payload.comment_id,
      };
    case 'SET_TO_EDIT':
      return {
        ...state,
        toEdit: action.payload.comment_id,
        toDelete: '',
        toReplyTo: '',
      };
    case 'SET_TO_DELETE':
      return {
        ...state,
        toEdit: '',
        toDelete: action.payload.comment_id,
        toReplyTo: '',
      };
    case 'RESET_IDS': {
      return { ...state, toEdit: '', toDelete: '', toReplyTo: '' };
    }
    default:
      return state;
  }
};
