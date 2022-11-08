import { object, string, TypeOf, z } from 'zod';

export const getRepliesSchema = object({
  params: object({
    commentId: string({}),
    page: string({}),
  }),
  body: object({
    userId: string({}),
  }),
});

export const addReplySchema = object({
  body: object({
    commentId: string({ required_error: 'Comment id is required' }),
    text: string({ required_error: 'Text is required' }).min(1).max(1000),
  }),
});

export const updateReplySchema = object({
  body: object({
    replyId: string({ required_error: 'Reply id is required' }),
    text: string({ required_error: 'Text is required' }).min(1).max(1000),
  }),
});

export const deleteReplySchema = object({
  body: object({
    replyId: string({ required_error: 'Reply id is required' }),
    commentId: string({ required_error: 'Comment id is required' }),
  }),
});

export const likeReplySchema = object({
  params: object({
    replyId: string({ required_error: 'Reply id param is required' }),
  }),
});

export const dislikeReplySchema = object({
  params: object({
    replyId: string({ required_error: 'Reply id param is required' }),
  }),
});

export type GetRepliesInput = TypeOf<typeof getRepliesSchema>;

export type AddReplyInput = TypeOf<typeof addReplySchema>['body'];

export type UpdateReplyInput = TypeOf<typeof updateReplySchema>['body'];

export type DeleteReplyInput = TypeOf<typeof deleteReplySchema>['body'];

export type LikeReplyInput = TypeOf<typeof likeReplySchema>['params'];

export type DislikeReplyInput = TypeOf<typeof dislikeReplySchema>['params'];
