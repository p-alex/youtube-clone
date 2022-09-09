import { Request, Response } from 'express';
import {
  AddCommentInput,
  DeleteCommentInput,
  GetCommentsInput,
  LikeOrDislikeCommentInput,
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
  const { video_id, page, limit } = req.params;
  try {
    const comments = await getComments(video_id, page, limit);
    return res.status(200).json({ success: true, errors: [], result: { comments } });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errors: [{ message: error.message }], result: null });
  }
};

export const addCommentController = async (
  req: Request<{}, {}, AddCommentInput>,
  res: Response
) => {
  const { video_id, text } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const comment = await addComment(video_id, user_id, text);
    return res.status(201).json({ success: true, errors: [], result: { comment } });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errors: [{ message: error.message }], result: null });
  }
};

export const updateCommentController = async (
  req: Request<{}, {}, UpdateCommentInput>,
  res: Response
) => {
  const { comment_id, text } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const comment = await updateComment(comment_id, user_id, text);
    return res.status(200).json({ success: true, errors: [], result: { comment } });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errors: [{ message: error.message }], result: null });
  }
};

export const deleteCommentController = async (
  req: Request<{}, {}, DeleteCommentInput>,
  res: Response
) => {
  const { comment_id } = req.body;
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const comment = await deleteComment(comment_id, user_id);
    return res.status(200).json({ success: true, errors: [], result: { comment } });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errors: [{ message: error.message }], result: null });
  }
};

export const likeOrDislikeCommentController = async (
  req: Request<{}, {}, LikeOrDislikeCommentInput>,
  res: Response
) => {
  const { action_type, comment_id } = req.body;
  //@ts-ignore
  const { user_id } = req.user;

  try {
    await likeOrDislikeComment(action_type, comment_id, user_id);
    return res.status(200).json({ success: true, errors: [], result: null });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errors: [{ message: error.message }], result: null });
  }
};
