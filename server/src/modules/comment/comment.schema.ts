import { object, string, TypeOf, z } from "zod";

export const getCommentsSchema = object({
  params: object({
    videoId: string({}),
    page: string({}),
  }),
});

export const addCommentSchema = object({
  body: object({
    videoId: string({ required_error: "Video id is required" }),
    text: string({ required_error: "Text is required" }).min(1).max(1000),
  }),
});

export const updateCommentSchema = object({
  body: object({
    commentId: string({ required_error: "Comment id is required" }),
    text: string({ required_error: "Text is required" }).min(1).max(1000),
  }),
});

export const deleteCommentSchema = object({
  body: object({
    commentId: string({ required_error: "Comment id is required" }),
    videoId: string({ required_error: "Video id is required" }),
  }),
});

const ActionType = z.enum(["like", "dislike"]);

type ActionType = z.infer<typeof ActionType>;

export const likeOrDislikeCommentSchema = object({
  body: object({
    actionType: ActionType,
    commentId: string({ required_error: "Comment id is required" }),
  }),
});

export type GetCommentsInput = TypeOf<typeof getCommentsSchema>["params"];

export type AddCommentInput = TypeOf<typeof addCommentSchema>["body"];

export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>["body"];

export type DeleteCommentInput = TypeOf<typeof deleteCommentSchema>["body"];

export type LikeOrDislikeCommentInput = TypeOf<
  typeof likeOrDislikeCommentSchema
>["body"];
