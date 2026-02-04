import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "Inventory API running"
  });
});

export default app;