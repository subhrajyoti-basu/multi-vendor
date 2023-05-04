import express from "express";
import morgan from "morgan";
import errMiddleware from "./middleware/error.js";
import authRouter from "./routes/authRoute.js";

// initialize express
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRouter);

// error middleware
app.use(errMiddleware);
export default app;
