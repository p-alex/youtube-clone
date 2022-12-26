import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().min(1, "Can't be blank").email('Invalid email'),
    password: z.string().min(1, "Can't be blank"),
  })
  .strict();

export type LoginSchemaType = z.infer<typeof loginSchema>;
