import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app as socketApp, server } from "./socket.js";
import dotenv from "dotenv";
import ConnectDb from "./db/index.js";
import serverless from "serverless-http";

// Load environment variables
dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Middleware setup
socketApp.use(express.json());
socketApp.use(cookieParser());
socketApp.use(cors({ origin: "*", credentials: true }));

// Import routers
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";

// Use routers
socketApp.use("/api", authRouter);
socketApp.use("/api/message", messageRouter);
socketApp.use("/api/user", userRouter);
socketApp.use(express.static(path.join(__dirname, "/client/dist")));

socketApp.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Centralized error handler
socketApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Wrap Express app with serverless-http
const handler = serverless(socketApp);

// Export the handler for Vercel
export { handler };

// Database connection (only if running locally)
if (process.env.NODE_ENV !== "production") {
  ConnectDb()
    .then(() => server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }))
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
}
