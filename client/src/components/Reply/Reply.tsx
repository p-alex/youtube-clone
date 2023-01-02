import Image from 'next/image';
import Link from 'next/link';
import { useContext, useRef, useState, useEffect } from 'react';
import {
  IReply,
  ReplySectionContext,
} from '../../context/ReplySectionContext/ReplySectionProvider';
import useReply from '../../hooks/commentSectionHooks/useReply';
import { dateConverter } from '../../utils/dateConverter';
import {
  Reply__Body,
  Reply__Button,
  Reply__Buttons,
  Reply__Container,
  Reply__Date,
  Reply__FormContainer,
  Reply__Header,
  Reply__ProfilePicture,
  Reply__Text,
  Reply__Username,
  Reply__UsernameAndDate,
} from './Reply.styles';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import CommentForm from '../Comment/CommentForm/CommentForm';
import CommentDropDown from '../../ui/CommentDropDown';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { ReadMoreToggleBtn } from '../Comment/Comment.styles';

const Reply = ({ reply }: { reply: IReply }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { toReplyTo, toEdit, toDelete } = useContext(ReplySectionContext);
  const [showMoreText, setShowMoreText] = useState<boolean | null>(null);
  const handleToggleShowMoreText = () => setShowMoreText((prevState) => !prevState);

  const {
    newReplyText,
    changeNewReplyText,
    editedReplyText,
    changeEditedReplyText,
    handleSetToReplyTo,
    handleSetToEdit,
    handleSetToDelete,
    handleResetIds,
    handleAddReply,
    handleLikeReply,
    handleDislikeReply,
    handleEditReply,
    handleDeleteReply,
    isAddReplyLoading,
    isLikeReplyLoading,
    isDislikeReplyLoading,
    isEditReplyLoading,
    isDeleteReplyLoading,
  } = useReply(reply);

  const replyBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const replyText = document.getElementById(
      `replyText-${reply.reply_id}`
    ) as HTMLParagraphElement;
    const maxLines = 4;
    const lineHeight = 20;
    if (replyText.offsetHeight > maxLines * lineHeight) {
      setShowMoreText(false);
    }
  }, []);

  return (
    <Reply__Container>
      {toDelete === reply.reply_id && (
        <ConfirmationModal
          isLoading={isDeleteReplyLoading}
          btnName={'edit'}
          title={'Delete reply'}
          message={'Delete reply permanently?'}
          func={handleDeleteReply}
          toggle={handleResetIds}
        />
      )}
      {toEdit === reply.reply_id && (
        <CommentForm
          value={editedReplyText}
          setValue={changeEditedReplyText}
          func={handleEditReply}
          toggle={handleResetIds}
          withTrap
          btnName="edit"
          placeholder="Edit your comment..."
          isLoading={isEditReplyLoading}
          error={undefined}
        />
      )}
      {toEdit !== reply.reply_id && (
        <>
          <Reply__ProfilePicture>
            <Image src={reply.profile_picture} width="40" height="40" alt="" />
          </Reply__ProfilePicture>
          <Reply__Body>
            <Reply__Header>
              <Reply__UsernameAndDate>
                <Reply__Username>
                  <Link href={'#'}>{reply.username}</Link>
                </Reply__Username>
                <Reply__Date>
                  {dateConverter(new Date(reply.created_at).getTime())}
                </Reply__Date>
              </Reply__UsernameAndDate>
              {reply.user_id === user.user_id && (
                <CommentDropDown
                  handleSetToEdit={handleSetToEdit}
                  handleSetToDelete={handleSetToDelete}
                />
              )}
            </Reply__Header>
            <Reply__Text showMoreText={showMoreText} id={`replyText-${reply.reply_id}`}>
              {reply.text}
            </Reply__Text>
            {typeof showMoreText === 'boolean' && (
              <ReadMoreToggleBtn onClick={handleToggleShowMoreText}>
                {showMoreText ? 'Show less' : 'Read more'}
              </ReadMoreToggleBtn>
            )}
            <Reply__Buttons>
              <Reply__Button
                onClick={handleLikeReply}
                disabled={isLikeReplyLoading || isDislikeReplyLoading}
              >
                {reply.total_likes}{' '}
                {reply.like_status === 'like' ? <AiFillLike /> : <AiOutlineLike />}
              </Reply__Button>
              <Reply__Button
                onClick={handleDislikeReply}
                disabled={isDislikeReplyLoading || isLikeReplyLoading}
              >
                {reply.total_dislikes}{' '}
                {reply.like_status === 'dislike' ? (
                  <AiFillDislike />
                ) : (
                  <AiOutlineDislike />
                )}
              </Reply__Button>
              {reply.user_id !== user.user_id && (
                <Reply__Button onClick={handleSetToReplyTo} ref={replyBtn}>
                  Reply
                </Reply__Button>
              )}
            </Reply__Buttons>
            {reply.reply_id === toReplyTo && (
              <Reply__FormContainer>
                <CommentForm
                  isLoading={isAddReplyLoading}
                  value={newReplyText}
                  setValue={changeNewReplyText}
                  toggle={handleResetIds}
                  func={handleAddReply}
                  redirectToElement={replyBtn}
                  btnName="reply"
                  placeholder="Write a reply"
                  autoFocus
                  error={undefined}
                />
              </Reply__FormContainer>
            )}
          </Reply__Body>
        </>
      )}
    </Reply__Container>
  );
};

export default Reply;
