import { object, string, TypeOf, z } from 'zod';

export const getCommentsSchema = object({
  params: object({
    videoId: string({}).uuid('Invalid uuid'),
    page: string({}),
  }),
  body: object({
    userId: string({}),
  }),
});

export const addCommentSchema = object({
  body: object({
    videoId: string({ required_error: 'Video id is required' }).uuid('Invalid uuid'),
    text: string({ required_error: 'Text is required' }).min(1).max(1500),
  }),
});

export const updateCommentSchema = object({
  body: object({
    commentId: string({ required_error: 'Comment id is required' }).uuid('Invalid uuid'),
    text: string({ required_error: 'Text is required' }).min(1).max(1500),
  }),
});

export const deleteCommentSchema = object({
  body: object({
    commentId: string({ required_error: 'Comment id is required' }).uuid('Invalid uuid'),
    videoId: string({ required_error: 'Video id is required' }).uuid('Invalid uuid'),
  }),
});

export const likeCommentSchema = object({
  params: object({
    commentId: string({ required_error: 'Comment id param is required' }).uuid(
      'Invalid uuid'
    ),
  }),
});

export const dislikeCommentSchema = object({
  params: object({
    commentId: string({ required_error: 'Comment id param is required' }).uuid(
      'Invalid uuid'
    ),
  }),
});

export type GetCommentsInput = TypeOf<typeof getCommentsSchema>;

export type AddCommentInput = TypeOf<typeof addCommentSchema>['body'];

export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>['body'];

export type DeleteCommentInput = TypeOf<typeof deleteCommentSchema>['body'];

export type LikeCommentInput = TypeOf<typeof likeCommentSchema>['params'];

export type DislikeCommentInput = TypeOf<typeof dislikeCommentSchema>['params'];
