import db from '../../db';

interface IComment {
  comment_id: string;
  video_id: string;
  text: string;
  total_likes: number;
  total_dislikes: number;
  total_replies: number;
  user_id: string;
  username: string;
  profile_picture: string;
  like_status: boolean | null;
  created_at: string;
}

export const getComments = async (video_id: string, user_id: string, page: string) => {
  const limit = 10;
  if (!user_id) user_id = 'ee220fdc-1dc1-4946-b5db-f9e391fc730b';
  const response = await db.query(
    'SELECT c.comment_id, c.video_id, c.text, c.total_likes, c.total_dislikes, c.total_replies, cl.like_status, u.user_id, u.username, u.profile_picture, c.created_at FROM comments AS c LEFT JOIN users AS u ON c.user_id = u.user_id LEFT JOIN comment_likes AS cl ON cl.user_id = $1 AND cl.comment_id = c.comment_id WHERE c.video_id = $2 ORDER BY c.created_at DESC LIMIT $3 OFFSET $4',
    [user_id, video_id, limit, limit * parseInt(page)]
  );
  const data: IComment[] = response.rows;
  return data;
};

export const addComment = async (video_id: string, user_id: string, text: string) => {
  const response = await db.query('SELECT * FROM add_comment($1, $2, $3)', [
    video_id,
    user_id,
    text,
  ]);
  const data: IComment = response.rows[0];
  return data;
};

export const updateComment = async (
  comment_id: string,
  user_id: string,
  text: string
) => {
  const response = await db.query(
    'UPDATE comments SET text = $1 WHERE comment_id = $2 AND user_id = $3 RETURNING comment_id',
    [text, comment_id, user_id]
  );
  const data: { comment_id: string } = response.rows[0];
  return data;
};

export const deleteComment = async (
  comment_id: string,
  video_id: string,
  user_id: string
) => {
  const response = await db.query('SELECT * FROM delete_comment($1, $2, $3)', [
    comment_id,
    video_id,
    user_id,
  ]);
  const data: { delete_comment: string } = response.rows[0];
  return data.delete_comment;
};

export const likeOrDislikeComment = async (
  action_type: 'like' | 'dislike',
  comment_id: string,
  user_id: string
) => {
  const response = await db.query('SELECT * FROM like_or_dislike_comment ($1,$2,$3)', [
    action_type,
    comment_id,
    user_id,
  ]);
  const data: {
    comment_id: string;
    like_status: boolean | null;
    total_likes: number;
    total_dislike: number;
  } = response.rows[0];
  return data;
};
