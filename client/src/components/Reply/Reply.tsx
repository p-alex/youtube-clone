import Image from 'next/image';
import Link from 'next/link';
import { useContext, useRef } from 'react';
import {
  IReply,
  ReplySectionContext,
} from '../../context/ReplySectionContext/ReplySectionProvider';
import useReply from '../../hooks/useReply';
import { dateConverter } from '../../utils/dateConverter';
import {
  ReplyBody,
  ReplyButton,
  ReplyButtons,
  ReplyContainer,
  ReplyDate,
  ReplyFormContainer,
  ReplyHeader,
  ReplyProfilePicture,
  ReplyText,
  ReplyUsername,
  ReplyUsernameAndDate,
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

const Reply = ({ reply }: { reply: IReply }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { toReplyTo, toEdit, toDelete } = useContext(ReplySectionContext);

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

  return (
    <ReplyContainer>
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
        />
      )}
      {toEdit !== reply.reply_id && (
        <>
          <ReplyProfilePicture>
            <Image src={reply.profile_picture} width="40" height="40" alt="" />
          </ReplyProfilePicture>

          <ReplyBody>
            <ReplyHeader>
              <ReplyUsernameAndDate>
                <ReplyUsername>
                  <Link href={'#'}>{reply.username}</Link>
                </ReplyUsername>
                <ReplyDate>
                  {dateConverter(new Date(reply.created_at).getTime())}
                </ReplyDate>
              </ReplyUsernameAndDate>
              {reply.user_id === user.user_id && (
                <CommentDropDown
                  handleSetToEdit={handleSetToEdit}
                  handleSetToDelete={handleSetToDelete}
                />
              )}
            </ReplyHeader>
            <ReplyText>{reply.text}</ReplyText>
            <ReplyButtons>
              <ReplyButton
                onClick={handleLikeReply}
                disabled={isLikeReplyLoading || isDislikeReplyLoading}
              >
                {reply.total_likes}{' '}
                {reply.like_status ? <AiFillLike /> : <AiOutlineLike />}
              </ReplyButton>
              <ReplyButton
                onClick={handleDislikeReply}
                disabled={isDislikeReplyLoading || isLikeReplyLoading}
              >
                {reply.total_dislikes}{' '}
                {reply.like_status === false ? <AiFillDislike /> : <AiOutlineDislike />}
              </ReplyButton>
              {reply.user_id !== user.user_id && (
                <ReplyButton onClick={handleSetToReplyTo} ref={replyBtn}>
                  Reply
                </ReplyButton>
              )}
            </ReplyButtons>
            {reply.reply_id === toReplyTo && (
              <ReplyFormContainer>
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
                />
              </ReplyFormContainer>
            )}
          </ReplyBody>
        </>
      )}
    </ReplyContainer>
  );
};

export default Reply;
