import { Request, Response } from "express";
import {
  AddReplyInput,
  DeleteReplyInput,
  GetRepliesInput,
  LikeOrDislikeReplyInput,
  UpdateReplyInput,
} from "./reply.schema";
import {
  addReply,
  deleteReply,
  getReplies,
  likeOrDislikeReply,
  updateReply,
} from "./reply.service";

export const getRepliesController = async (
  req: Request<GetRepliesInput>,
  res: Response
) => {
  const { commentId, page } = req.params;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    const replies = await getReplies(commentId, user_id, page);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { replies } });
  } catch (error: any) {
    console.log(error);
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
    const reply_id = await addReply(commentId, user_id, text);
    return res
      .status(201)
      .json({ success: true, errors: [], result: { reply_id } });
  } catch (error: any) {
    console.log(error);
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
    const { reply_id } = await updateReply(replyId, user_id, text);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { replyId } });
  } catch (error: any) {
    console.log(error);
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
    return res
      .status(200)
      .json({ success: true, errors: [], result: { reply_id } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const likeOrDislikeReplyController = async (
  req: Request<{}, {}, LikeOrDislikeReplyInput>,
  res: Response
) => {
  const { actionType, replyId } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    await likeOrDislikeReply(actionType, replyId, user_id);
    return res.status(200).json({ success: true, errors: [], result: null });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};
