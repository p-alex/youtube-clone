import { Request, Response } from 'express';
import log from '../../utils/logger';
import { errorResponseJson, successResponseJson } from '../../utils/responseJson';
import {
  AddReplyInput,
  DeleteReplyInput,
  DislikeReplyInput,
  GetRepliesInput,
  LikeReplyInput,
  UpdateReplyInput,
} from './reply.schema';
import {
  addReply,
  deleteReply,
  getReplies,
  likeOrDislikeReply,
  updateReply,
} from './reply.service';

export const getRepliesController = async (
  req: Request<GetRepliesInput['params'], {}, GetRepliesInput['body']>,
  res: Response
) => {
  const { commentId, page } = req.params;
  const { userId } = req.body;
  try {
    const replies = await getReplies(commentId, userId, page);
    return successResponseJson(res, 200, { replies });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const addReplyController = async (
  req: Request<{}, {}, AddReplyInput>,
  res: Response
) => {
  const { commentId, text, repliedTo } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const reply = await addReply(commentId, user_id, text, repliedTo);
    return successResponseJson(res, 200, { reply });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const updateReplyController = async (
  req: Request<{}, {}, UpdateReplyInput>,
  res: Response
) => {
  const { replyId, text } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const response = await updateReply(replyId, user_id, text);
    return successResponseJson(res, 200, { response });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const deleteReplyController = async (
  req: Request<{}, {}, DeleteReplyInput>,
  res: Response
) => {
  const { replyId, commentId } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const reply_id = await deleteReply(replyId, commentId, user_id);
    return successResponseJson(res, 200, { reply_id });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const likeReplyController = async (
  req: Request<LikeReplyInput>,
  res: Response
) => {
  try {
    const { replyId } = req.params;
    //@ts-ignore
    const { user_id } = req.user;
    const updatedReplyInfo = await likeOrDislikeReply('like', replyId, user_id);
    return successResponseJson(res, 200, { updatedReplyInfo });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};

export const dislikeReplyController = async (
  req: Request<DislikeReplyInput>,
  res: Response
) => {
  try {
    const { replyId } = req.params;
    //@ts-ignore
    const { user_id } = req.user;
    const updatedReplyInfo = await likeOrDislikeReply('dislike', replyId, user_id);
    return successResponseJson(res, 200, { updatedReplyInfo });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};
