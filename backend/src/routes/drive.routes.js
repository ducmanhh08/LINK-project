import express from "express";
import * as controller from "../controllers/drive.controller.js";
import requireAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/files", requireAuth, controller.getFiles);

export default router;
