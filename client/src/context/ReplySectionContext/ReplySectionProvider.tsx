import { createContext, ReactNode, useReducer } from 'react';
import { LikeStatusType } from '../../app/features/videoSlice';
import { ReplySectionActions } from './actionTypes';
import { reducer } from './reducer';

export interface IReply {
  reply_id: string;
  comment_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  text: string;
  total_likes: number;
  total_dislikes: number;
  like_status: LikeStatusType;
  created_at: string | number;
}

export interface InitialState {
  replies: IReply[];
  newReplies: IReply[];
  page: number;
  limit: number;
  toReplyTo: string;
  toEdit: string;
  toDelete: string;
}

const initialState: InitialState = {
  replies: [],
  newReplies: [],
  page: 0,
  limit: 10,
  toReplyTo: '',
  toEdit: '',
  toDelete: '',
};

const ReplySectionContext = createContext<{
  replies: IReply[];
  newReplies: IReply[];
  page: number;
  limit: number;
  toReplyTo: string;
  toEdit: string;
  toDelete: string;
  dispatchReplySection: (action: ReplySectionActions) => void;
}>({
  replies: [],
  newReplies: [],
  page: 0,
  limit: 10,
  toReplyTo: '',
  toEdit: '',
  toDelete: '',
  dispatchReplySection: () => {},
});

const ReplySectionProvider = ({ children }: { children: ReactNode }) => {
  const [replySectionState, dispatchReplySection] = useReducer(reducer, initialState);
  const { replies, newReplies, page, limit, toReplyTo, toEdit, toDelete } =
    replySectionState;
  return (
    <ReplySectionContext.Provider
      value={{
        replies,
        newReplies,
        page,
        limit,
        toReplyTo,
        toEdit,
        toDelete,
        dispatchReplySection,
      }}
    >
      {children}
    </ReplySectionContext.Provider>
  );
};

export { ReplySectionContext, ReplySectionProvider };
