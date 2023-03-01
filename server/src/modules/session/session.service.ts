import axios from 'axios';
import { QueryResult } from 'pg';
import db from '../../db';

export const createSession = async (user_id: string) => {
  try {
    const session: QueryResult<{ session_id: string; user_id: string }> = await db.query(
      'INSERT INTO sessions (user_id) VALUES ($1) RETURNING session_id, user_id',
      [user_id]
    );
    return session.rows[0];
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
