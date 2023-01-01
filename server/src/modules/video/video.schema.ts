import { object, TypeOf, string, array, number, nullable, z } from 'zod';

export const getVideoSchema = object({
  body: object({
    videoId: string({}).uuid('Video id is invalid'),
    userId: string({}),
  }),
});

export const getUserVideosPrivateSchema = object({
  params: object({
    sortBy: z.enum(['recent', 'popular']),
    page: string({ required_error: 'Please provide page param' }),
  }),
});

export const getUserVideosSchema = object({
  params: object({
    userId: string({ required_error: 'Please provide userId param' }).uuid(
      'User id is invalid'
    ),
    sortBy: z.enum(['recent', 'popular']),
    page: string({ required_error: 'Please provide page param' }),
  }),
});

export const uploadVideoSchema = object({
  body: object({
    userId: string({ required_error: 'User id is required' }).uuid('User id is invalid'),
    title: string({
      required_error: 'Title is required',
    })
      .min(1)
      .max(100),
    description: string({}).max(1500, 'Description must be max 1500 characters'),
    duration: number({
      required_error: 'Duration is required',
    }),
    mimetype: string({
      required_error: 'Mime type is required',
    }),
    thumbnailUrl: string({
      required_error: 'Thumbnail is required',
    }).url('Thumbnail url is invalid'),
    videoUrl: string({ required_error: 'Video_url is required' }),
    tagList: array(string({})),
  }),
});

export const updateVideoSchema = object({
  body: object({
    videoId: string({ required_error: 'Video id required' }).uuid('Video id is invalid'),
    title: string({}).min(1).max(100),
    description: string({}).max(1500),
    thumbnailData: object({
      currentThumbnailUrl: string({
        required_error: 'Current thumbnail url is required',
      }).url('Current thumbnail url is invalid'),
      newThumbnailBase64: nullable(string({})),
    }),
    tagList: nullable(array(string({})).min(4)),
  }),
});

export const deleteVideoSchema = object({
  body: object({
    videoId: string({ required_error: 'Video id is required' }).uuid(
      'Video id is invalid'
    ),
  }),
});

export const likeVideoSchema = object({
  params: object({
    videoId: string({ required_error: 'Video id param is required' }).uuid(
      'Video id is invalid'
    ),
  }),
});

export const dislikeVideoSchema = object({
  params: object({
    videoId: string({ required_error: 'Video id param is required' }).uuid(
      'Video id is invalid'
    ),
  }),
});

export const getVideoTagsSchema = object({
  params: object({
    videoId: string({ required_error: 'Video id is required' }).uuid(
      'Video id is invalid'
    ),
  }),
});

export const searchVideosSchema = object({
  params: object({
    query: string({ required_error: 'Query param is required' }),
  }),
});

export const getSuggestedVideosSchema = object({
  body: object({
    videoId: string({ required_error: 'Please provide video id' }).uuid(
      'Video id is invalid'
    ),
    title: string({ required_error: 'Please provide video title' }),
    description: string({ required_error: 'Please provide video description' }),
    page: number({ required_error: 'Please provide page param' }),
  }),
});

export type GetVideoInput = TypeOf<typeof getVideoSchema>['body'];

export type GetUserVideosPrivateInput = TypeOf<
  typeof getUserVideosPrivateSchema
>['params'];

export type GetUserVideosInput = TypeOf<typeof getUserVideosSchema>['params'];

export type UploadVideoInput = TypeOf<typeof uploadVideoSchema>['body'];

export type UpdateVideoInput = TypeOf<typeof updateVideoSchema>['body'];

export type DeleteVideoInput = TypeOf<typeof deleteVideoSchema>['body'];

export type LikeVideoInput = TypeOf<typeof likeVideoSchema>['params'];

export type DislikeVideoInput = TypeOf<typeof likeVideoSchema>['params'];

export type GetVideoTagsInput = TypeOf<typeof getVideoTagsSchema>['params'];

export type SearchVideosInput = TypeOf<typeof searchVideosSchema>['params'];

export type GetSuggestedVideosInput = TypeOf<typeof getSuggestedVideosSchema>['body'];
