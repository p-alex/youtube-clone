import { z } from 'zod';

export const getSubscriptionsSchema = z.object({
  params: z.object({
    page: z
      .string({ required_error: 'No page param' })
      .regex(/^\d+$/g, 'Page must be a number'),
  }),
});

export const subscribeToUserSchema = z.object({
  body: z.object({
    subscribeToUserId: z
      .string({ required_error: 'User id is required' })
      .uuid('User id must be a uuid'),
  }),
});

export const checkIfCurrentUserIsSubscribedToUserSchema = z.object({
  params: z.object({
    userId: z
      .string({ required_error: 'User id is required' })
      .uuid('Current user id must be a uuid'),
  }),
});

export type GetSubscriptionVideosInput = z.TypeOf<
  typeof getSubscriptionsSchema
>['params'];

export type SubscribeToUserInput = z.TypeOf<typeof subscribeToUserSchema>['body'];

export type CheckIfCurrentUserIsSubscribedToUserInput = z.TypeOf<
  typeof checkIfCurrentUserIsSubscribedToUserSchema
>['params'];
