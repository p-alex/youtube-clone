import { z } from 'zod';
import { UsernameSchema } from '../user/user.schema';

export const getRepliesSchema = z.object({
  params: z.object({
    commentId: z.string({}).uuid('Invalid uuid'),
    page: z.string({}),
  }),
  body: z.object({
    userId: z.string({}),
  }),
});

export const addReplySchema = z.object({
  body: z.object({
    commentId: z
      .string({ required_error: 'Comment id is required' })
      .uuid('Invalid uuid'),
    text: z.string({ required_error: 'Text is required' }).min(1).max(1000),
    repliedTo: z
      .string({ required_error: 'Replied to user id is required' })
      .uuid('Reply to user id must be a uuid'),
  }),
});

export const updateReplySchema = z.object({
  body: z.object({
    replyId: z.string({ required_error: 'Reply id is required' }).uuid('Invalid uuid'),
    text: z.string({ required_error: 'Text is required' }).min(1).max(1000),
  }),
});

export const deleteReplySchema = z.object({
  body: z.object({
    replyId: z.string({ required_error: 'Reply id is required' }).uuid('Invalid uuid'),
    commentId: z
      .string({ required_error: 'Comment id is required' })
      .uuid('Invalid uuid'),
  }),
});

export const likeReplySchema = z.object({
  params: z.object({
    replyId: z
      .string({ required_error: 'Reply id param is required' })
      .uuid('Invalid uuid'),
  }),
});

export const dislikeReplySchema = z.object({
  params: z.object({
    replyId: z
      .string({ required_error: 'Reply id param is required' })
      .uuid('Invalid uuid'),
  }),
});

export type GetRepliesInput = z.TypeOf<typeof getRepliesSchema>;

export type AddReplyInput = z.TypeOf<typeof addReplySchema>['body'];

export type UpdateReplyInput = z.TypeOf<typeof updateReplySchema>['body'];

export type DeleteReplyInput = z.TypeOf<typeof deleteReplySchema>['body'];

export type LikeReplyInput = z.TypeOf<typeof likeReplySchema>['params'];

export type DislikeReplyInput = z.TypeOf<typeof dislikeReplySchema>['params'];
