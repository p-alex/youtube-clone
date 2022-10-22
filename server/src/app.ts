import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import config from 'config';
import cors from 'cors';
import log from './utils/logger';
import router from './modules/routes';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || config.get('port');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '101mb',
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(router);

app.listen(PORT, () => {
  log.info(`Server started at http://localhost:${PORT}`);
});
