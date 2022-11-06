import { createContext, ReactNode, useReducer } from 'react';
import { CommentSectionActions } from './actionTypes';
import { reducer } from './reducer';

export interface IComment {
  comment_id: string;
  video_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  text: string;
  total_replies: number;
  total_likes: number;
  total_dislikes: number;
  like_status: 'like' | 'dislike' | 'none';
  created_at: string | number;
}

export interface InitialState {
  comments: IComment[];
  page: number;
  limit: number;
  toReplyTo: string;
  toEdit: string;
  toDelete: string;
}

const initialState: InitialState = {
  comments: [],
  page: 0,
  limit: 12,
  toReplyTo: '',
  toEdit: '',
  toDelete: '',
};

const CommentSectionContext = createContext<{
  comments: IComment[];
  page: number;
  limit: number;
  toReplyTo: string;
  toEdit: string;
  toDelete: string;
  dispatchCommentSection: (action: CommentSectionActions) => void;
}>({
  comments: [],
  page: 0,
  limit: 12,
  toReplyTo: '',
  toEdit: '',
  toDelete: '',
  dispatchCommentSection: () => {},
});

const CommentSectionProvider = ({ children }: { children: ReactNode }) => {
  const [commentSectionState, dispatchCommentSection] = useReducer(reducer, initialState);
  const { comments, page, limit, toReplyTo, toEdit, toDelete } = commentSectionState;
  return (
    <CommentSectionContext.Provider
      value={{
        comments,
        page,
        limit,
        toReplyTo,
        toEdit,
        toDelete,
        dispatchCommentSection,
      }}
    >
      {children}
    </CommentSectionContext.Provider>
  );
};

export { CommentSectionContext, CommentSectionProvider };
