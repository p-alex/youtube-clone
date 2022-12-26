import { string, z } from 'zod';

export const verifyCodeSchema = z.object({
  code: string().min(1, "Can't be blank").length(6, 'Invalid code'),
});

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;
