import { ChangeEvent, useEffect, useState, useContext } from 'react';
import {
  CommentSectionContext,
  IComment,
} from '../../context/CommentSectionContext/CommentSectionProvider';
import Comment from '../../components/Comment/Comment';
import {
  CommentSection__Container,
  CommentSection__LoadBtn,
  CommentSection__TotalComments,
} from './CommentSection.styles';
import CommentForm from '../../components/Comment/CommentForm/CommentForm';
import { ReplySectionProvider } from '../../context/ReplySectionContext/ReplySectionProvider';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
import { addToTotalComments, VideoInfo } from '../../app/features/videoSlice';
import Spinner from '../../ui/Spinner';
import { removeEmptyLinesFromString } from '../../utils/removeEmptyLinesFromString';

const CommentSection = ({ video }: { video: VideoInfo }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const { comments, page, limit, dispatchCommentSection } =
    useContext(CommentSectionContext);

  const [newCommentText, setNewCommentText] = useState('');

  const changeNewCommentText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(event.target.value);
  };

  const [getComments, { isLoading: isGetCommentsLoading }] = useAxiosWithRetry<
    { userId: string },
    { comments: IComment[] }
  >(`api/comments/${video.video_id}/${page}`, 'POST');

  const handleGetComments = async () => {
    const { success, result } = await getComments({ userId: user.user_id });
    if (!success || !result) return;
    dispatchCommentSection({
      type: 'SET_COMMENTS',
      payload: { comments: result.comments },
    });
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  const [addComment, { isLoading: isAddCommentLoading, errors }] = useAxiosWithRetry<
    { videoId: string; text: string },
    { comment: IComment }
  >('api/comments', 'POST');

  const handleAddComment = async () => {
    const { success, result } = await addComment({
      videoId: video.video_id,
      text: removeEmptyLinesFromString(newCommentText),
    });
    if (!success || !result) return;
    const newComment = {
      ...result.comment,
      user_id: user.user_id,
      username: user.username,
      profile_picture: user.profile_picture,
    };
    dispatchCommentSection({
      type: 'ADD_COMMENT',
      payload: { comment: newComment },
    });
    setNewCommentText('');
    dispatch(addToTotalComments());
  };

  const [loadMoreComment, { isLoading: isLoadMoreCommentsLoading }] = useAxiosWithRetry<
    {},
    { comments: IComment[] }
  >(`api/comments/${video.video_id}/${page}`);

  const handleLoadMoreComments = async () => {
    const { success, result } = await loadMoreComment({});
    if (!success || !result) return;
    dispatchCommentSection({
      type: 'LOAD_MORE_COMMENTS',
      payload: { comments: result.comments },
    });
  };

  useEffect(() => {
    if (page > 0) {
      handleLoadMoreComments();
    }
  }, [page]);

  return (
    <CommentSection__Container>
      <CommentSection__TotalComments>
        {video.total_comments} comments
      </CommentSection__TotalComments>
      {user.user_id && (
        <CommentForm
          value={newCommentText}
          setValue={changeNewCommentText}
          func={handleAddComment}
          isLoading={isAddCommentLoading}
          btnName="comment"
          placeholder="Write a comment..."
          error={errors ? errors[0].message : undefined}
        />
      )}
      <br />
      {comments.map((comment) => {
        return (
          <ReplySectionProvider key={comment.comment_id}>
            <Comment key={comment.comment_id} comment={comment} />
          </ReplySectionProvider>
        );
      })}
      {comments.length < video.total_comments && video.total_comments > 12 && (
        <CommentSection__LoadBtn
          onClick={() => dispatchCommentSection({ type: 'NEXT_PAGE' })}
        >
          Load more comments
        </CommentSection__LoadBtn>
      )}
      {isLoadMoreCommentsLoading && <Spinner />}
    </CommentSection__Container>
  );
};

export default CommentSection;
