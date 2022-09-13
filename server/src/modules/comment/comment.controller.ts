import { Request, Response } from "express";
import {
  AddCommentInput,
  DeleteCommentInput,
  GetCommentsInput,
  LikeOrDislikeCommentInput,
  UpdateCommentInput,
} from "./comment.schema";
import {
  addComment,
  deleteComment,
  getComments,
  likeOrDislikeComment,
  updateComment,
} from "./comment.service";

export const getCommentsController = async (
  req: Request<GetCommentsInput>,
  res: Response
) => {
  const { videoId, page } = req.params;
  // @ts-ignore
  const { user_id } = req.user;
  try {
    const comments = await getComments(videoId, user_id, page);
    return res
      .status(200)
      .json({ success: true, errors: [], result: { comments } });
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
    const comment_id = await addComment(videoId, user_id, text);
    return res
      .status(201)
      .json({ success: true, errors: [], result: { comment_id } });
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
    return res
      .status(200)
      .json({ success: true, errors: [], result: { comment_id } });
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
    return res
      .status(200)
      .json({ success: true, errors: [], result: { comment_id } });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
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
    return res.status(500).json({
      success: false,
      errors: [{ message: error.message }],
      result: null,
    });
  }
};
