import { string, z } from 'zod';
import { ReTokenSchema } from './createAccount.schema';

export const editVideoSchema = z.object({
  videoId: z.string().min(1, "Can't be blank").uuid(),
  title: z.string().min(1, "Can't be blank"),
  description: z.string(),
  thumbnailData: z.object({
    currentThumbnailUrl: string().min(1, "Current thumbnail can't be blank").url(),
    newThumbnailBase64: string().nullable(),
  }),
  tagList: z.array(string()).nullable(),
  reToken: ReTokenSchema,
});

export type EditVideoSchemaType = z.TypeOf<typeof editVideoSchema>;
