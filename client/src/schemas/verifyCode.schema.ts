import { string, z } from 'zod';

export const verifyCodeSchema = z.object({
  code: string({ required_error: 'Please provide a code' }).length(6, 'Invalid code'),
});

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;
