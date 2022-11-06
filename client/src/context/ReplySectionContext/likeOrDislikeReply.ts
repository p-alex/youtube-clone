import { LikeStatusType } from '../../app/features/videoSlice';
import { IReply } from './ReplySectionProvider';

export const likeOrDislikeReply = (
  replies: IReply[],
  updatedReplyInfo: {
    reply_id: string;
    like_status: LikeStatusType;
    total_likes: number;
    total_dislikes: number;
  }
) => {
  return replies.map((reply) => {
    if (reply.reply_id === updatedReplyInfo.reply_id) {
      reply.like_status = updatedReplyInfo.like_status;
      reply.total_likes = updatedReplyInfo.total_likes;
      reply.total_dislikes = updatedReplyInfo.total_dislikes;
      return reply;
    }
    return reply;
  });
};
