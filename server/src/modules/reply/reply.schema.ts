import { object, string, TypeOf, z } from "zod";

export const getRepliesSchema = object({
  params: object({
    commentId: string({}),
    page: string({}),
  }),
});

export const addReplySchema = object({
  body: object({
    commentId: string({ required_error: "Comment id is required" }),
    text: string({ required_error: "Text is required" }).min(1).max(1000),
  }),
});

export const updateReplySchema = object({
  body: object({
    replyId: string({ required_error: "Reply id is required" }),
    text: string({ required_error: "Text is required" }).min(1).max(1000),
  }),
});

export const deleteReplySchema = object({
  body: object({
    replyId: string({ required_error: "Reply id is required" }),
    commentId: string({ required_error: "Video id is required" }),
  }),
});

const ActionType = z.enum(["like", "dislike"]);

type ActionType = z.infer<typeof ActionType>;

export const likeOrDislikeReplySchema = object({
  body: object({
    actionType: ActionType,
    replyId: string({ required_error: "Reply id is required" }),
  }),
});

export type GetRepliesInput = TypeOf<typeof getRepliesSchema>["params"];

export type AddReplyInput = TypeOf<typeof addReplySchema>["body"];

export type UpdateReplyInput = TypeOf<typeof updateReplySchema>["body"];

export type DeleteReplyInput = TypeOf<typeof deleteReplySchema>["body"];

export type LikeOrDislikeReplyInput = TypeOf<
  typeof likeOrDislikeReplySchema
>["body"];
