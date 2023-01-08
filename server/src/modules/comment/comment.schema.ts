import { z } from 'zod';

export const getCommentsSchema = z.object({
  params: z.object({
    videoId: z.string({}).uuid('Invalid uuid'),
    page: z.string({}),
  }),
  body: z.object({
    userId: z.string({}),
  }),
});

export const addCommentSchema = z.object({
  body: z.object({
    videoId: z.string({ required_error: 'Video id is required' }).uuid('Invalid uuid'),
    text: z.string({ required_error: 'Text is required' }).min(1).max(1500),
  }),
});

export const updateCommentSchema = z.object({
  body: z.object({
    commentId: z
      .string({ required_error: 'Comment id is required' })
      .uuid('Invalid uuid'),
    text: z.string({ required_error: 'Text is required' }).min(1).max(1500),
  }),
});

export const deleteCommentSchema = z.object({
  body: z.object({
    commentId: z
      .string({ required_error: 'Comment id is required' })
      .uuid('Invalid uuid'),
    videoId: z.string({ required_error: 'Video id is required' }).uuid('Invalid uuid'),
  }),
});

export const likeCommentSchema = z.object({
  params: z.object({
    commentId: z
      .string({ required_error: 'Comment id param is required' })
      .uuid('Invalid uuid'),
  }),
});

export const dislikeCommentSchema = z.object({
  params: z.object({
    commentId: z
      .string({ required_error: 'Comment id param is required' })
      .uuid('Invalid uuid'),
  }),
});

export type GetCommentsInput = z.TypeOf<typeof getCommentsSchema>;

export type AddCommentInput = z.TypeOf<typeof addCommentSchema>['body'];

export type UpdateCommentInput = z.TypeOf<typeof updateCommentSchema>['body'];

export type DeleteCommentInput = z.TypeOf<typeof deleteCommentSchema>['body'];

export type LikeCommentInput = z.TypeOf<typeof likeCommentSchema>['params'];

export type DislikeCommentInput = z.TypeOf<typeof dislikeCommentSchema>['params'];
