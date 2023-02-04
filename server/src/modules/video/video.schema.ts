import { z } from 'zod';
import { ReTokenSchema } from '../user/user.schema';

export const getVideoSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video id is required' })
      .uuid('Video id is invalid'),
  }),
});

export const getUserVideosPrivateSchema = z.object({
  params: z.object({
    sortBy: z.enum(['recent', 'popular']),
    page: z.string({ required_error: 'Please provide page param' }),
  }),
});

export const getUserVideosSchema = z.object({
  params: z.object({
    userId: z
      .string({ required_error: 'Please provide userId param' })
      .uuid('User id is invalid'),
    sortBy: z.enum(['recent', 'popular']),
    page: z.string({ required_error: 'Please provide page param' }),
  }),
});

export const uploadVideoSchema = z.object({
  body: z.object({
    userId: z
      .string({ required_error: 'User id is required' })
      .uuid('User id is invalid'),
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1)
      .max(100),
    description: z.string({}).max(1500, 'Description must be max 1500 characters'),
    duration: z.number({
      required_error: 'Duration is required',
    }),
    mimetype: z.string({
      required_error: 'Mime type is required',
    }),
    thumbnailUrl: z
      .string({
        required_error: 'Thumbnail is required',
      })
      .url('Thumbnail url is invalid'),
    videoUrl: z.string({ required_error: 'Video_url is required' }),
    tagList: z.array(z.string({})),
    sizeInMb: z.number({}).max(100, 'Video must be 100mb max'),
    reToken: z.string({ required_error: 'Recaptcha token required' }),
  }),
});

export const updateVideoSchema = z.object({
  body: z.object({
    videoId: z
      .string({ required_error: 'Video id required' })
      .uuid('Video id is invalid'),
    title: z.string({}).min(1).max(100),
    description: z.string({}).max(1500),
    thumbnailData: z.object({
      currentThumbnailUrl: z
        .string({
          required_error: 'Current thumbnail url is required',
        })
        .url('Current thumbnail url is invalid'),
      newThumbnailBase64: z.nullable(z.string({})),
    }),
    tagList: z.nullable(z.array(z.string({}))),
    reToken: ReTokenSchema,
  }),
});

export const deleteVideoSchema = z.object({
  body: z.object({
    videoId: z
      .string({ required_error: 'Video id is required' })
      .uuid('Video id is invalid'),
  }),
});

export const likeVideoSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video id param is required' })
      .uuid('Video id is invalid'),
  }),
});

export const dislikeVideoSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video id param is required' })
      .uuid('Video id is invalid'),
  }),
});

export const getVideoTagsSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video id is required' })
      .uuid('Video id is invalid'),
  }),
});

export const searchVideosSchema = z.object({
  params: z.object({
    query: z.string({ required_error: 'Query param is required' }),
  }),
});

export const getSuggestedVideosSchema = z.object({
  body: z.object({
    videoId: z
      .string({ required_error: 'Please provide video id' })
      .uuid('Video id is invalid'),
    title: z.string({ required_error: 'Please provide video title' }),
    description: z.string({ required_error: 'Please provide video description' }),
    page: z.number({ required_error: 'Please provide page param' }),
  }),
});

export const checkIfVideoIsLikedSchema = z.object({
  params: z.object({
    videoId: z
      .string({ required_error: 'Video id param is required' })
      .uuid('Video id param must be a uuid'),
  }),
});

export type GetVideoInput = z.TypeOf<typeof getVideoSchema>['params'];

export type GetUserVideosPrivateInput = z.TypeOf<
  typeof getUserVideosPrivateSchema
>['params'];

export type GetUserVideosInput = z.TypeOf<typeof getUserVideosSchema>['params'];

export type UploadVideoInput = z.TypeOf<typeof uploadVideoSchema>['body'];

export type UpdateVideoInput = z.TypeOf<typeof updateVideoSchema>['body'];

export type DeleteVideoInput = z.TypeOf<typeof deleteVideoSchema>['body'];

export type LikeVideoInput = z.TypeOf<typeof likeVideoSchema>['params'];

export type DislikeVideoInput = z.TypeOf<typeof likeVideoSchema>['params'];

export type GetVideoTagsInput = z.TypeOf<typeof getVideoTagsSchema>['params'];

export type SearchVideosInput = z.TypeOf<typeof searchVideosSchema>['params'];

export type GetSuggestedVideosInput = z.TypeOf<typeof getSuggestedVideosSchema>['body'];

export type CheckIfVideoIsLikedInput = z.TypeOf<
  typeof checkIfVideoIsLikedSchema
>['params'];
