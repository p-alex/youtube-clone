import { z } from 'zod';

export const uploadVideoSchema = z.object({
  userId: z.string({}).uuid(),
  thumbnailUrl: z.string().url('Please choose a thumbnail'),
  title: z.string().min(1, "Can't be blank").max(100, 'Maximum 100 characters'),
  description: z.string().max(1500, 'Maximum 1500 characters'),
  tagList: z.array(z.string({})).max(25, 'Maximum 25 tags'),
  duration: z.number({}),
  mimetype: z.string({}).min(1, 'Required'),
  sizeInMb: z.number({}).max(100, 'Video must be 100mb max'),
  reToken: z.string({}).min(1, 'Please check the checkbox'),
});

export type UploadVideoSchemaType = z.infer<typeof uploadVideoSchema>;
