import { string, z } from 'zod';
import { ReTokenSchema } from './createAccount.schema';

export const verifyCodeSchema = z.object({
  code: string().min(1, "Can't be blank").length(6, 'Invalid code'),
  reToken: ReTokenSchema,
});

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;
