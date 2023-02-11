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
  replied_to: string;
  replied_to_username: string;
  created_at: string | number;
}

export interface InitialState {
  replies: IReply[];
  newReplies: IReply[];
  page: number;
  limit: number;
  toReplyToUserId: string;
  toReplyToUsername: string;
  toReplyToReplyId: string;
  toEdit: string;
  toDelete: string;
}

const initialState: InitialState = {
  replies: [],
  newReplies: [],
  page: 0,
  limit: 10,
  toReplyToUsername: '',
  toReplyToReplyId: '',
  toReplyToUserId: '',
  toEdit: '',
  toDelete: '',
};

const ReplySectionContext = createContext<{
  replies: IReply[];
  newReplies: IReply[];
  page: number;
  limit: number;
  toReplyToUsername: string;
  toReplyToReplyId: string;
  toReplyToUserId: string;
  toEdit: string;
  toDelete: string;
  dispatchReplySection: (action: ReplySectionActions) => void;
}>({
  replies: [],
  newReplies: [],
  page: 0,
  limit: 10,
  toReplyToUsername: '',
  toReplyToReplyId: '',
  toReplyToUserId: '',
  toEdit: '',
  toDelete: '',
  dispatchReplySection: () => {},
});

const ReplySectionProvider = ({ children }: { children: ReactNode }) => {
  const [replySectionState, dispatchReplySection] = useReducer(reducer, initialState);
  const {
    replies,
    newReplies,
    page,
    limit,
    toReplyToUsername,
    toReplyToReplyId,
    toReplyToUserId,
    toEdit,
    toDelete,
  } = replySectionState;
  console.log(replySectionState);
  return (
    <ReplySectionContext.Provider
      value={{
        replies,
        newReplies,
        page,
        limit,
        toReplyToUsername,
        toReplyToReplyId,
        toReplyToUserId,
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
