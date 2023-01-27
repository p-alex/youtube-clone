import { z } from 'zod';
import { PasswordSchema } from './createAccount.schema';
import { ReTokenSchema } from './createAccount.schema';

export const loginSchema = z
  .object({
    email: z.string().min(1, "Can't be blank").email('Invalid email'),
    password: z.string({}).min(1, "Can't be blank"),
    reToken: ReTokenSchema,
  })
  .strict();

export type LoginSchemaType = z.infer<typeof loginSchema>;
