
import express from "express";
import session from "express-session";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import driveRoutes from "./routes/drive.routes.js";
import ruleRoutes from "./routes/rule.routes.js";

const app = express();

// Accept requests from the frontend and allow credentials (cookies)
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

// Must come BEFORE your routes
app.use(
  session({
    secret: "some_secret_key", // can be anything, keep it safe
    resave: false,             // don't save session if unmodified
    saveUninitialized: false,  // don't create session until something is stored
    cookie: {
      secure: false, // secure: true only for HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Parse JSON bodies
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/drive", driveRoutes);
app.use("/api/rules", ruleRoutes);

export default app;
