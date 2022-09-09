import db from '../../db';

interface Comment {
  comment_id: string;
  video_id: string;
  user_id: string;
  text: string;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
}

export const getComments = async (video_id: string, page: string, limit: string) => {
  const response = await db.query(
    'SELECT * FROM comments WHERE video_id = $1 ORDER BY created_at DESC LIMIT $3 OFFSET $2',
    [video_id, parseInt(page), parseInt(limit)]
  );
  const data: Comment[] = response.rows;
  return data;
};

export const addComment = async (video_id: string, user_id: string, text: string) => {
  const response = await db.query('INSERT INTO comments ($1, $2, $3) RETURNING *', [
    video_id,
    user_id,
    text,
  ]);
  const data: Comment = response.rows[0];
  return data;
};

export const updateComment = async (
  comment_id: string,
  user_id: string,
  text: string
) => {
  const response = await db.query(
    'UPDATE comments SET text = $1 WHERE comment_id = $2 AND user_id = $3 RETURNING *',
    [text, comment_id, user_id]
  );
  const data: Comment = response.rows[0];
  return data;
};

export const deleteComment = async (comment_id: string, user_id: string) => {
  const response = await db.query(
    'DELETE FROM comments WHERE comment_id = $1 AND user_id = $2 RETURNING *',
    [comment_id, user_id]
  );
  const data: Comment = response.rows[0];
  return data;
};

export const likeOrDislikeComment = async (
  action_type: 'like' | 'dislike',
  comment_id: string,
  user_id: string
) => {
  await db.query('SELECT * FROM like_or_dislike_comment ($1,$2,$3)', [
    action_type,
    comment_id,
    user_id,
  ]);
  return null;
};
