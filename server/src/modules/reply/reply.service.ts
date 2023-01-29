import db from '../../db';
import crypto from 'crypto';
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

export const getReplies = async (comment_id: string, user_id: string, page: string) => {
  const limit = 6;
  if (!user_id) user_id = crypto.randomUUID();
  const response = await db.query(
    "SELECT r.reply_id,r.comment_id,r.user_id,cu.username as replied_to,r.text,r.total_likes,r.total_dislikes,ru.user_id,ru.username,ru.profile_picture,CASE WHEN rl.user_id = $1 AND rl.like_status = 'like' THEN 'like' WHEN rl.user_id = $1 AND rl.like_status = 'dislike' THEN 'dislike' END like_status,r.created_at FROM replies AS r LEFT JOIN reply_likes AS rl ON rl.user_id=$1 AND rl.reply_id = r.reply_id LEFT JOIN comments AS c ON r.comment_id=c.comment_id LEFT JOIN users AS ru ON ru.user_id=r.user_id LEFT JOIN users AS cu ON cu.user_id=c.user_id WHERE r.comment_id=$2 ORDER BY r.created_at LIMIT $3 OFFSET $4",
    [user_id, comment_id, limit, limit * parseInt(page)]
  );
  const data: IReply[] = response.rows;
  return data;
};

export const addReply = async (comment_id: string, user_id: string, text: string) => {
  const response = await db.query('SELECT * FROM add_reply($1, $2, $3)', [
    comment_id,
    user_id,
    text,
  ]);
  const data: IReply = response.rows[0];
  return data;
};

export const updateReply = async (reply_id: string, user_id: string, text: string) => {
  const response = await db.query(
    'UPDATE replies SET text = $1 WHERE reply_id = $2 AND user_id = $3 RETURNING reply_id, text',
    [text, reply_id, user_id]
  );
  const data: { reply_id: string; text: string } = response.rows[0];
  return data;
};

export const deleteReply = async (
  reply_id: string,
  comment_id: string,
  user_id: string
) => {
  const response = await db.query('SELECT * FROM delete_reply($1, $2, $3)', [
    reply_id,
    comment_id,
    user_id,
  ]);
  const data: { delete_reply: string } = response.rows[0];
  return data.delete_reply;
};

export const likeOrDislikeReply = async (
  actionType: 'like' | 'dislike',
  replyId: string,
  userId: string
) => {
  const response = await db.query('SELECT * FROM like_or_dislike_reply($1,$2,$3)', [
    actionType,
    replyId,
    userId,
  ]);
  const data: {
    reply_id: string;
    like_status: boolean | null;
    total_likes: number;
    total_dislike: number;
  } = response.rows[0];
  return data;
};
