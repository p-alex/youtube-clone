import { useEffect, useContext, useState } from 'react';
import Reply from '../../components/Reply/Reply';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import {
  ReplySection__Container,
  ReplySection__LoadBtn,
  ReplySection__ToggleReplies,
  ReplySection__Wrapper,
} from './ReplySection.styles';
import {
  IReply,
  ReplySectionContext,
} from '../../context/ReplySectionContext/ReplySectionProvider';
import { IComment } from '../../context/CommentSectionContext/CommentSectionProvider';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import Spinner from '../../ui/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const ReplySection = ({ comment }: { comment: IComment }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { replies, newReplies, page, dispatchReplySection } =
    useContext(ReplySectionContext);

  const [showReplies, setShowReplies] = useState(false);

  const handleToggleReplies = () => {
    setShowReplies((prevState) => !prevState);
  };

  const [getReplies, { isLoading: isGetRepliesLoading }] = useAxiosWithRetry<
    { userId: string },
    { replies: IReply[] }
  >(`api/replies/${comment.comment_id}/${page}`, 'POST');

  const handleGetReplies = async () => {
    const { success, result } = await getReplies({ userId: user.user_id });
    if (!success || !result) return;
    dispatchReplySection({
      type: 'SET_REPLIES',
      payload: { replies: result.replies },
    });
  };

  const [loadMoreReplies, { isLoading: isLoadMoreRepliesLoading }] = useAxiosWithRetry<
    {},
    { replies: IReply[] }
  >(`api/replies/${comment.comment_id}/${page}`);

  const handleLoadMoreReplies = async () => {
    const { success, result } = await loadMoreReplies({});
    if (!success || !result) return;
    dispatchReplySection({
      type: 'LOAD_MORE_COMMENTS',
      payload: { replies: result.replies },
    });
  };

  useEffect(() => {
    if (page > 0) {
      handleLoadMoreReplies();
    }
  }, [page]);

  useEffect(() => {
    if (showReplies && replies.length === 0) {
      handleGetReplies();
    }
  }, [showReplies]);

  return (
    <ReplySection__Wrapper>
      {comment.total_replies > 0 && (
        <ReplySection__ToggleReplies onClick={handleToggleReplies}>
          {showReplies ? <AiFillCaretUp /> : <AiFillCaretDown />}
          {comment.total_replies} {comment.total_replies === 1 ? 'reply' : 'replies'}
        </ReplySection__ToggleReplies>
      )}
      {isGetRepliesLoading && <Spinner />}
      <ReplySection__Container>
        {showReplies && replies.length > 0 ? (
          <>
            {replies.map((reply) => {
              return <Reply key={reply.reply_id} reply={reply} />;
            })}
            {replies.length < comment.total_replies &&
              !isGetRepliesLoading &&
              !isLoadMoreRepliesLoading && (
                <ReplySection__LoadBtn
                  onClick={() => dispatchReplySection({ type: 'NEXT_PAGE' })}
                >
                  Load more replies
                </ReplySection__LoadBtn>
              )}
          </>
        ) : (
          newReplies.map((reply) => {
            return <Reply key={reply.created_at} reply={reply} />;
          })
        )}
        {isLoadMoreRepliesLoading && <Spinner />}
      </ReplySection__Container>
    </ReplySection__Wrapper>
  );
};

export default ReplySection;
