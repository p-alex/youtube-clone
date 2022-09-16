import db from "../../db";

interface IReply {
  reply_id: string;
  comment_id: string;
  text: string;
  total_likes: number;
  total_dislikes: number;
  user_id: string;
  username: string;
  profile_picture: string;
  like_status: boolean | null;
  created_at: string;
}

export const getReplies = async (
  comment_id: string,
  user_id: string,
  page: string
) => {
  const response = await db.query(
    "SELECT r.reply_id, r.text, r.total_likes, r.total_dislikes, CASE WHEN rl.user_id = $1 AND rl.like_status IS TRUE THEN TRUE WHEN rl.user_id = $1 AND rl.like_status IS FALSE THEN FALSE ELSE NULL END like_status, u.user_id, u.username, u.profile_picture, r.created_at FROM replies AS r LEFT JOIN users AS u ON u.user_id = r.user_id LEFT JOIN reply_likes AS rl ON rl.reply_id = r.reply_id AND rl.user_id = $1 WHERE r.comment_id = $2 ORDER BY r.created_at DESC LIMIT $3 OFFSET $4",
    [user_id, comment_id, 20, parseInt(page)]
  );
  const data: IReply[] = response.rows;
  return data;
};

export const addReply = async (
  comment_id: string,
  user_id: string,
  text: string
) => {
  const response = await db.query("SELECT * FROM add_reply($1, $2, $3)", [
    comment_id,
    user_id,
    text,
  ]);
  const data: { add_reply: string } = response.rows[0];
  return data.add_reply;
};

export const updateReply = async (
  reply_id: string,
  user_id: string,
  text: string
) => {
  const response = await db.query(
    "UPDATE replies SET text = $1 WHERE reply_id = $2 AND user_id = $3 RETURNING reply_id",
    [text, reply_id, user_id]
  );
  const data: { reply_id: string } = response.rows[0];
  return data;
};

export const deleteReply = async (
  reply_id: string,
  comment_id: string,
  user_id: string
) => {
  const response = await db.query("SELECT * FROM delete_reply($1, $2, $3)", [
    reply_id,
    comment_id,
    user_id,
  ]);
  const data: { delete_reply: string } = response.rows[0];
  return data.delete_reply;
};

export const likeOrDislikeReply = async (
  action_type: "like" | "dislike",
  reply_id: string,
  user_id: string
) => {
  await db.query("SELECT * FROM like_or_dislike_reply ($1,$2,$3)", [
    action_type,
    reply_id,
    user_id,
  ]);
  return null;
};
