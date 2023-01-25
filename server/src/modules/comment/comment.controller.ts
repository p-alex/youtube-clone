import { Request, Response } from 'express';
import log from '../../utils/logger';
import { errorResponseJson, successResponseJson } from '../../utils/responseJson';
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
  req: Request<GetCommentsInput['params'], {}, GetCommentsInput['body']>,
  res: Response
) => {
  const { videoId, page } = req.params;
  const { userId } = req.body;
  try {
    const comments = await getComments(videoId, userId, page);
    return successResponseJson(res, 200, { comments });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
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
    return successResponseJson(res, 200, { comment });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
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
    return successResponseJson(res, 200, { comment_id });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
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
    return successResponseJson(res, 200, { comment_id });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
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
    return successResponseJson(res, 200, { updatedCommentInfo });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
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
    return successResponseJson(res, 200, { updatedCommentInfo });
  } catch (error: any) {
    log.error(error);
    return errorResponseJson(res, 500, error.message);
  }
};
