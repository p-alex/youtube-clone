import { number, object, string, TypeOf, z } from "zod";

export const getCommentsSchema = object({
  params: object({
    video_id: string({}),
    page: string({}),
    limit: string({}),
  }),
});

export const addCommentSchema = object({
  body: object({
    video_id: string({ required_error: "Video id is required" }),
    text: string({ required_error: "Text is required" }).min(1).max(1000),
  }),
});

export const updateCommentSchema = object({
  body: object({
    comment_id: string({ required_error: "Comment id is required" }),
    text: string({ required_error: "Text is required" }).min(1).max(1000),
  }),
});

export const deleteCommentSchema = object({
  body: object({
    comment_id: string({ required_error: "Comment id is required" }),
    video_id: string({ required_error: "Video id is required" }),
  }),
});

const ActionType = z.enum(["like", "dislike"]);

type ActionType = z.infer<typeof ActionType>;

export const likeOrDislikeCommentSchema = object({
  body: object({
    action_type: ActionType,
    comment_id: string({ required_error: "Comment id is required" }),
  }),
});

export type GetCommentsInput = TypeOf<typeof getCommentsSchema>["params"];

export type AddCommentInput = TypeOf<typeof addCommentSchema>["body"];

export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>["body"];

export type DeleteCommentInput = TypeOf<typeof deleteCommentSchema>["body"];

export type LikeOrDislikeCommentInput = TypeOf<
  typeof likeOrDislikeCommentSchema
>["body"];
