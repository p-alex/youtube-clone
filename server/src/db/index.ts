import config from 'config';
import { Pool } from 'pg';
import log from '../utils/logger';

const pool = new Pool(config.get('db_config'));

log.info('Database connected');

export default {
  query: (text: string, params: any[]) => pool.query(text, params),
};
