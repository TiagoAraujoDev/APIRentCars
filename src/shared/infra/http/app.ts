import "reflect-metadata";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import upload from "@config/upload";

import swaggerFile from "../../../swaggerFile.json";
import { createConnection } from "../typeorm";
import { error } from "./middlewares/error";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);
app.use(error);

createConnection();

export { app };
