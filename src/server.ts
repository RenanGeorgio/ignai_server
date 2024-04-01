import cookieParser from "cookie-parser";
import cors from "cors";
import express, { ErrorRequestHandler, Response } from "express";
import routes from "./routes";

const app = express();

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"], // adicionar outra origem, caso necessário
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

// catch not defined routes
app.use((req, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// catch all errors
app.use(((error, req, res, next) => {
  res.status(error.status || 500).send({ message: error.message });
}) as ErrorRequestHandler);

export default app;