import db from "../../db";

interface IComment {
  comment_id: string;
  video_id: string;
  user_id: string;
  text: string;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
}

export const getComments = async (video_id: string, page: string) => {
  const response = await db.query(
    "SELECT * FROM comments WHERE video_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
    [video_id, 20, parseInt(page)]
  );
  const data: IComment[] = response.rows;
  return data;
};

export const addComment = async (
  video_id: string,
  user_id: string,
  text: string
) => {
  const response = await db.query("SELECT * FROM add_comment($1, $2, $3)", [
    video_id,
    user_id,
    text,
  ]);
  const data: { add_comment: string } = response.rows[0];
  return data.add_comment;
};

export const updateComment = async (
  comment_id: string,
  user_id: string,
  text: string
) => {
  const response = await db.query(
    "UPDATE comments SET text = $1 WHERE comment_id = $2 AND user_id = $3 RETURNING *",
    [text, comment_id, user_id]
  );
  const data: Comment = response.rows[0];
  return data;
};

export const deleteComment = async (
  comment_id: string,
  video_id: string,
  user_id: string
) => {
  const response = await db.query("SELECT * FROM delete_comment($1, $2, $3)", [
    comment_id,
    video_id,
    user_id,
  ]);
  const data: { delete_comment: string } = response.rows[0];
  return data.delete_comment;
};

export const likeOrDislikeComment = async (
  action_type: "like" | "dislike",
  comment_id: string,
  user_id: string
) => {
  await db.query("SELECT * FROM like_or_dislike_comment ($1,$2,$3)", [
    action_type,
    comment_id,
    user_id,
  ]);
  return null;
};
