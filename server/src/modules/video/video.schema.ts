import { object, TypeOf, string, array, number, nullable, z } from 'zod';

export const getVideoSchema = object({
  params: object({
    video_id: string({}),
  }),
});

export const uploadVideoSchema = object({
  body: object({
    user_id: string({ required_error: 'User id is required' }),
    title: string({
      required_error: 'Title is required',
    })
      .min(1)
      .max(100),
    description: string({}).max(1000, 'Description must be max 1000 characters'),
    duration: number({
      required_error: 'Duration is required',
    }),
    mimetype: string({
      required_error: 'Mime type is required',
    }),
    thumbnail_url: string({
      required_error: 'Thumbnail is required',
    }),
    video_url: string({ required_error: 'Video_url is required' }).max(0),
    tag_list: array(string({})).min(4),
  }),
});

export const updateVideoSchema = object({
  body: object({
    video_id: string({ required_error: 'Video id required' }),
    title: string({}).min(1).max(100),
    description: string({}).max(1000),
    thumbnail_data: object({
      current_thumbnail_url: string({
        required_error: 'Current thumbnail url is required',
      }),
      new_thumbnail_base64: nullable(string({})),
    }),
    tag_list: nullable(array(string({})).min(4)),
  }),
});

export const deleteVideoSchema = object({
  body: object({
    video_id: string({ required_error: 'Video id is required' }),
  }),
});

const ActionType = z.enum(['like', 'dislike']);

type ActionType = z.infer<typeof ActionType>;

export const likeOrDislikeVideoSchema = object({
  body: object({
    action_type: ActionType,
    video_id: string({ required_error: 'Video id is required' }),
  }),
});

export const getVideoTagsSchema = object({
  params: object({
    video_id: string({ required_error: 'Video id is required' }),
  }),
});

export type GetVideoInput = TypeOf<typeof getVideoSchema>['params'];

export type UploadVideoInput = TypeOf<typeof uploadVideoSchema>['body'];

export type UpdateVideoInput = TypeOf<typeof updateVideoSchema>['body'];

export type DeleteVideoInput = TypeOf<typeof deleteVideoSchema>['body'];

export type LikeOrDislikeVideoInput = TypeOf<typeof likeOrDislikeVideoSchema>['body'];

export type GetVideoTagsInput = TypeOf<typeof getVideoTagsSchema>['params'];
