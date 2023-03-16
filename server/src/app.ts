import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import config from "config";
import cors from "cors";
import log from "./utils/logger";
import router from "./modules/routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : config.get<string>("client_side_base_url"),
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "101mb",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", router);

const PORT = parseInt(process.env.PORT!);

app.listen(PORT, () => {
  log.info(`Server started at http://localhost:${PORT}`);
});
