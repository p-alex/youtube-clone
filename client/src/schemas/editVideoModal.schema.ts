import { string, TypeOf, z } from 'zod';

export const editVideoSchema = z.object({
  title: string().min(1, "Can't be blank"),
});

export type EditVideoSchemaType = TypeOf<typeof editVideoSchema>;
