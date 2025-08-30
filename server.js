import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ideaRouter from "./routes/ideaRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// connect to mongoDB
connectDB();

// CORS Config
const allowedOrigins = [
  "http://localhost:3000",
  "https://idea-drop-ui-three.vercel.app/",
];

// middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/ideas", ideaRouter);
app.use("/api/auth", authRouter);

// 404 Fallback
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
