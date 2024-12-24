import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./socket.js";
import dotenv from "dotenv";
import ConnectDb from "./db/index.js";

// Load environment variables
dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

// Import routers
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

// Use routers
app.use("/api", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Database connection and server startup
ConnectDb()
  .then(() => server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }))
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
