import { Request, Response } from 'express';
import log from '../../utils/logger';
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
    return res.status(200).json({ success: true, errors: [], result: { replies } });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const addReplyController = async (
  req: Request<{}, {}, AddReplyInput>,
  res: Response
) => {
  const { commentId, text } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const reply = await addReply(commentId, user_id, text);
    return res.status(201).json({ success: true, errors: [], result: { reply } });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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
    return res.status(200).json({
      success: true,
      errors: [],
      result: { reply_id: response.reply_id, text: response.text },
    });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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
    return res.status(200).json({ success: true, errors: [], result: { reply_id } });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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
    return res
      .status(200)
      .json({ success: true, errors: [], result: { updatedReplyInfo } });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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
    return res
      .status(200)
      .json({ success: true, errors: [], result: { updatedReplyInfo } });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};
