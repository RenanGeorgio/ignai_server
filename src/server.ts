import cookieParser from "cookie-parser";
import cors from "cors";
import express, { ErrorRequestHandler, NextFunction, Response } from "express";
import routes from "./routes";
import { CustomRequest } from "./helpers/customRequest";
import corsOrigins from "./config/corsOrigins";

const app = express();

const allowedOrigins = corsOrigins;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true
};

app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

// catch not defined routes
app.use((req: CustomRequest, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// catch all errors
app.use(((error: any, req: CustomRequest, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send({ message: error.message });
}) as ErrorRequestHandler);

export default app;