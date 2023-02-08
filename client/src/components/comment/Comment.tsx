import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import ReplySection from '../../containers/ReplySection/ReplySection';
import {
  CommentSectionContext,
  IComment,
} from '../../context/CommentSectionContext/CommentSectionProvider';
import useComment from '../../hooks/commentSectionHooks/useComment';
import { dateConverter } from '../../utils/dateConverter';
import {
  CommentBody,
  CommentButton,
  CommentButtons,
  CommentContainer,
  CommentDate,
  CommentHeader,
  CommentProfilePicture,
  CommentText,
  CommentUsername,
  CommentUsernameAndDate,
  Comment__FormContainer,
  ReadMoreToggleBtn,
} from './Comment.styles';
import CommentForm from './CommentForm/CommentForm';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import CommentDropDown from '../../ui/CommentDropDown';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const Comment = ({ comment }: { comment: IComment }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { toReplyTo, toDelete, toEdit } = useContext(CommentSectionContext);

  const {
    newReplyText,
    changeNewReplyText,
    editedCommentText,
    changeEditedCommentText,
    handleAddReply,
    handleSetToReplyTo,
    handleSetToEdit,
    handleSetToDelete,
    handleResetIds,
    handleLikeComment,
    handleDislikeComment,
    handleEditComment,
    handleDeleteComment,
    isAddReplyLoading,
    isEditLoading,
    isLikeCommentLoading,
    isDislikeCommentLoading,
    isDeleteLoading,
    addReplyErrors,
    editCommentErrors,
  } = useComment(comment);

  const replyBtn = useRef<HTMLButtonElement>(null);

  const [showMoreText, setShowMoreText] = useState<boolean | null>(null);

  const handleToggleShowMoreText = () => setShowMoreText((prevState) => !prevState);

  useEffect(() => {
    const commentText = document.getElementById(
      `commentText-${comment.comment_id}`
    ) as HTMLParagraphElement;
    const maxLines = 4;
    const lineHeight = 20;
    if (commentText.offsetHeight > maxLines * lineHeight) {
      setShowMoreText(false);
    }
  }, []);

  return (
    <CommentContainer>
      {toDelete === comment.comment_id && (
        <ConfirmationModal
          title="Delete comment"
          message="Delete comment permanently?"
          func={handleDeleteComment}
          toggle={handleResetIds}
          btnName={'Delete'}
          isLoading={isDeleteLoading}
        />
      )}
      {toEdit === comment.comment_id && (
        <CommentForm
          value={editedCommentText}
          setValue={changeEditedCommentText}
          func={handleEditComment}
          toggle={handleResetIds}
          autoFocus
          withTrap
          btnName="edit"
          placeholder="Edit your comment..."
          isLoading={isEditLoading}
          error={editCommentErrors ? editCommentErrors[0].message : undefined}
        />
      )}
      {toEdit !== comment.comment_id && (
        <>
          <CommentProfilePicture>
            <Image src={comment.profile_picture} width="40" height="40" alt="" />
          </CommentProfilePicture>
          <CommentBody>
            <CommentHeader>
              <CommentUsernameAndDate>
                <CommentUsername>
                  <Link href={'#'}>{comment.username}</Link>
                </CommentUsername>
                <CommentDate>
                  {dateConverter(new Date(comment.created_at).getTime())}
                </CommentDate>
              </CommentUsernameAndDate>
              {comment.user_id === user.user_id && (
                <CommentDropDown
                  handleSetToDelete={handleSetToDelete}
                  handleSetToEdit={handleSetToEdit}
                />
              )}
            </CommentHeader>
            <CommentText
              id={`commentText-${comment.comment_id}`}
              showMoreText={showMoreText}
            >
              {comment.text}
            </CommentText>
            {typeof showMoreText === 'boolean' && (
              <ReadMoreToggleBtn onClick={handleToggleShowMoreText}>
                {showMoreText ? 'Show less' : 'Read more'}
              </ReadMoreToggleBtn>
            )}

            <CommentButtons>
              <CommentButton
                onClick={handleLikeComment}
                disabled={isLikeCommentLoading || isDislikeCommentLoading}
              >
                {comment.like_status === 'like' ? <AiFillLike /> : <AiOutlineLike />}
                {comment.total_likes}
              </CommentButton>
              <CommentButton
                onClick={handleDislikeComment}
                disabled={isLikeCommentLoading || isDislikeCommentLoading}
              >
                {comment.like_status === 'dislike' ? (
                  <AiFillDislike />
                ) : (
                  <AiOutlineDislike />
                )}
                {comment.total_dislikes}
              </CommentButton>

              {comment.user_id !== user.user_id && (
                <CommentButton
                  onClick={handleSetToReplyTo}
                  ref={replyBtn}
                  id={'replyBtn-' + comment.comment_id}
                >
                  Reply
                </CommentButton>
              )}
            </CommentButtons>
            {toReplyTo === comment.comment_id && (
              <Comment__FormContainer>
                <CommentForm
                  value={newReplyText}
                  setValue={changeNewReplyText}
                  toggle={handleResetIds}
                  func={handleAddReply}
                  isLoading={isAddReplyLoading}
                  redirectToElement={replyBtn}
                  btnName={'reply'}
                  placeholder={'Write a reply...'}
                  autoFocus
                  withTrap
                  error={addReplyErrors ? addReplyErrors[0].message : undefined}
                />
              </Comment__FormContainer>
            )}
            <ReplySection comment={comment} />
          </CommentBody>
        </>
      )}
    </CommentContainer>
  );
};

export default Comment;
