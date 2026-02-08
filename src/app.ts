import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors({
    origin: "http://localhost:8081",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "Inventory API running"
  });
});

export default app;