import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import swaggerFile from "../../../swaggerFile.json";
import { createConnection } from "../typeorm";
import { error } from "./middlewares/error";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(error);

createConnection("database_rentcars");

export { app };
