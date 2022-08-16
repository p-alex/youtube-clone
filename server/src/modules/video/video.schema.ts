import { object, TypeOf, string, array } from 'zod';

export const addNewVideoSchema = object({
  body: object({
    video_url: string({ required_error: 'Video url is required' }),
    user_id: string({ required_error: 'User id is required' }),
    title: string({
      required_error: 'Title is required',
    })
      .min(1)
      .max(100),
    description: string({}).max(1000, 'Description must be max 1000 characters'),
    tags: array(string({})).min(4),
    thumbnail: string({
      required_error: 'Thumbnail is required',
    }),
    duration: string({
      required_error: 'Duration is required',
    }),
    mimeType: string({
      required_error: 'Mime type is required',
    }),
  }),
});

export type AddNewVideoInput = TypeOf<typeof addNewVideoSchema>['body'];
