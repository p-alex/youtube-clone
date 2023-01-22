import { z } from 'zod';

export const getSubscriptionsSchema = z.object({
  params: z.object({
    page: z
      .string({ required_error: 'No page param' })
      .regex(/^\d+$/g, 'Page must be a number'),
  }),
});

export type GetSubscriptionVideosInput = z.TypeOf<
  typeof getSubscriptionsSchema
>['params'];
