import { Request, Response } from 'express';
import {
  AddCommentInput,
  DeleteCommentInput,
  DislikeCommentInput,
  GetCommentsInput,
  LikeCommentInput,
  UpdateCommentInput,
} from './comment.schema';
import {
  addComment,
  deleteComment,
  getComments,
  likeOrDislikeComment,
  updateComment,
} from './comment.service';

export const getCommentsController = async (
  req: Request<GetCommentsInput>,
  res: Response
) => {
  const { videoId, page } = req.params;
  // @ts-ignore
  const user = req.user;
  const userId = user?.user_id;
  try {
    const comments = await getComments(videoId, userId, page);
    return res.status(200).json({ success: true, errors: [], result: { comments } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const addCommentController = async (
  req: Request<{}, {}, AddCommentInput>,
  res: Response
) => {
  const { videoId, text } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const comment = await addComment(videoId, user_id, text);
    return res.status(201).json({ success: true, errors: [], result: { comment } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const updateCommentController = async (
  req: Request<{}, {}, UpdateCommentInput>,
  res: Response
) => {
  const { commentId, text } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const { comment_id } = await updateComment(commentId, user_id, text);
    return res.status(200).json({ success: true, errors: [], result: { comment_id } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const deleteCommentController = async (
  req: Request<{}, {}, DeleteCommentInput>,
  res: Response
) => {
  const { commentId, videoId } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const comment_id = await deleteComment(commentId, videoId, user_id);
    return res.status(200).json({ success: true, errors: [], result: { comment_id } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const likeCommentController = async (
  req: Request<LikeCommentInput>,
  res: Response
) => {
  const { commentId } = req.params;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const updatedCommentInfo = await likeOrDislikeComment('like', commentId, user_id);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { updatedCommentInfo } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};

export const dislikeCommentController = async (
  req: Request<DislikeCommentInput>,
  res: Response
) => {
  const { commentId } = req.params;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const updatedCommentInfo = await likeOrDislikeComment('dislike', commentId, user_id);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { updatedCommentInfo } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};
