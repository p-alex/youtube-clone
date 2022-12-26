import { z } from 'zod';

export const uploadVideoSchema = z.object({
  thumbnailUrl: z.string().url('Please choose a thumbnail'),
  title: z.string().min(1, "Can't be blank").max(100, 'Maximum 100 characters'),
  description: z.string().max(1500, 'Maximum 1500 characters'),
  tags: z.array(z.string({})).max(25, 'Maximum 25 tags'),
});

export type UploadVideoSchemaType = z.infer<typeof uploadVideoSchema>;
